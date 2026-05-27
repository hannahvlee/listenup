-- 졸업생 데이터 import
-- profiles 테이블에 먼저 넣고, toefl_scores에 넣어요
-- user_id는 임의 UUID (gen_random_uuid() 사용)

-- 1. 오소율
DO $$
DECLARE v_uid uuid := gen_random_uuid();
BEGIN
  INSERT INTO profiles (user_id, name, class, target_score, target_date)
  VALUES (v_uid, '오소율', '인터', 90, '2026-12-31');

  INSERT INTO toefl_scores (user_id, type, reading, listening, speaking, writing, total, test_date)
  VALUES (v_uid, 'real', 4.5, 5.0, 5.0, 4.0, 4.5, '2026-05-16');
END $$;

-- 2. 정수연
DO $$
DECLARE v_uid uuid := gen_random_uuid();
BEGIN
  INSERT INTO profiles (user_id, name, class, target_score, target_date)
  VALUES (v_uid, '정수연', '완초2', 100, '2026-07-01');

  INSERT INTO toefl_scores (user_id, type, reading, listening, speaking, writing, total, test_date)
  VALUES (v_uid, 'real', 5.5, 6.0, 4.5, 4.5, 5.0, '2026-05-02');
END $$;

-- 3. 김리현
DO $$
DECLARE v_uid uuid := gen_random_uuid();
BEGIN
  INSERT INTO profiles (user_id, name, class, target_score, target_date)
  VALUES (v_uid, '김리현', '인터', 100, '2026-04-10');

  INSERT INTO toefl_scores (user_id, type, reading, listening, speaking, writing, total, test_date)
  VALUES (v_uid, 'real', 6.0, 4.5, 5.5, 4.5, 5.0, '2026-04-01');
END $$;

-- 4. 전서연
DO $$
DECLARE v_uid uuid := gen_random_uuid();
BEGIN
  INSERT INTO profiles (user_id, name, class, target_score, target_date)
  VALUES (v_uid, '전서연', '인터', 100, '2026-09-01');

  INSERT INTO toefl_scores (user_id, type, reading, listening, speaking, writing, total, test_date)
  VALUES (v_uid, 'real', 5.5, 5.5, 5.0, 4.5, 5.0, '2026-04-01');
END $$;

-- 5. 김하연
DO $$
DECLARE v_uid uuid := gen_random_uuid();
BEGIN
  INSERT INTO profiles (user_id, name, class, target_score, target_date)
  VALUES (v_uid, '김하연', '인터', 100, '2026-06-01');

  INSERT INTO toefl_scores (user_id, type, reading, listening, speaking, writing, total, test_date)
  VALUES (v_uid, 'real', 4.5, 5.5, 5.5, 4.0, 5.0, '2026-04-29');
END $$;
