import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateTouchTarget,
  calculateContrastRatio,
  evaluateThumbReach,
  simulateTapPrecision,
  PLATFORM_SPECS,
} from './ergonomics';

test('evaluateTouchTarget identifies Android 48dp compliant target', () => {
  const result = evaluateTouchTarget(48, 48, 'android');
  assert.equal(result.isCompliant, true);
  assert.equal(result.wcagLevel, 'AAA');
  assert.equal(result.verdict, 'DO');
  assert.equal(result.deficitWidth, 0);
  assert.equal(result.deficitHeight, 0);
});

test('evaluateTouchTarget flags cramped 28dp target as anti-pattern', () => {
  const result = evaluateTouchTarget(28, 28, 'android');
  assert.equal(result.isCompliant, false);
  assert.equal(result.wcagLevel, 'AA');
  assert.equal(result.verdict, 'WARNING');
  assert.equal(result.deficitWidth, 20);
  assert.equal(result.deficitHeight, 20);
});

test('evaluateTouchTarget flags sub-24px target as severe failure', () => {
  const result = evaluateTouchTarget(18, 18, 'web');
  assert.equal(result.isCompliant, false);
  assert.equal(result.wcagLevel, 'FAIL');
  assert.equal(result.verdict, 'DON\'T');
});

test('evaluateTouchTarget respects iOS 44pt specification', () => {
  const resultPass = evaluateTouchTarget(44, 44, 'ios');
  assert.equal(resultPass.isCompliant, true);

  const resultFail = evaluateTouchTarget(40, 40, 'ios');
  assert.equal(resultFail.isCompliant, false);
  assert.equal(resultFail.deficitWidth, 4);
});

test('calculateContrastRatio validates high contrast against dark background', () => {
  // #F8FAFC on #0B0F19
  const ratio = calculateContrastRatio('#F8FAFC', '#0B0F19');
  assert.ok(ratio > 14.0, `Expected high contrast ratio > 14:1, got ${ratio}`);

  // Low contrast check (e.g. #334155 on #0F172A)
  const lowRatio = calculateContrastRatio('#334155', '#0F172A');
  assert.ok(lowRatio < 3.0, `Expected low contrast ratio < 3.0, got ${lowRatio}`);
});

test('evaluateThumbReach correctly identifies screen ergonomic zones', () => {
  // Bottom 70%
  const bottomZone = evaluateThumbReach(0.75, 'right');
  assert.equal(bottomZone.zone, 'natural');
  assert.ok(bottomZone.comfortScore >= 90);

  // Middle 45%
  const midZone = evaluateThumbReach(0.45, 'right');
  assert.equal(midZone.zone, 'stretch');

  // Top 15%
  const topZone = evaluateThumbReach(0.15, 'right');
  assert.equal(topZone.zone, 'hard');
  assert.ok(topZone.comfortScore <= 35);
});

test('simulateTapPrecision shows high hit rate for compliant 48px target', () => {
  const compliant = simulateTapPrecision(48);
  assert.ok(compliant.hitRatePercent >= 99);
  assert.ok(compliant.avgAcquisitionTimeMs <= 250);

  const cramped = simulateTapPrecision(20);
  assert.ok(cramped.missRatePercent > 50);
});
