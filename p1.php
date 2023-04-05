<?php
# POSTされてきたデータの受け取り（decode）
$json = file_get_contents("php://input"); # POST されてきた jsonを受け取る
$data = json_decode($json);//jsonをphp変数に変換

# ここから Database 接続と処理
try {
  $pw = 'wapppass';
  # databaseに接続するための PDO オブジェクトを作成
  $pdo = new PDO(
    "mysql:dbname=p1db;host=localhost;charset=utf8mb4", #dsn
    "webapp", # username
    $pw, # password
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]  # driver_options
  );

  create_table($pdo); # テーブルがないなら作成

  $score = $data;
  $value = [':score'=> $score];
  $st = $pdo->prepare("insert into p1db (score) values(:score)");#SQLを用意
  $ret = $st->execute($value);#SQLの実行
  $st2 = $pdo->prepare("select count(score) from p1db group by score");#SQLを用意
  $ret = $st2->execute();#SQLの実行
  $ret = $st2->fetchall();
  $json = json_encode($ret);
  header('Content-Type: application/json; charset=UTF-8');
  print($json);
} catch (PDOException $e) {
  // DB error (via PDO)
  header('Content-Type: text/plain; charset=UTF-8', true, 500);
  exit($e->getMessage());
}

# 以下、DB操作のための関数群
function create_table($pdo) {
  $st = $pdo->query('CREATE TABLE IF NOT EXISTS p1db(id INT auto_increment PRIMARY KEY,score int)');
}
?>