<?php
#ini_set('display_errors', 1); # ブラウザにエラー出力する。実運用時にこの設定にしてはならない。
const select_sql = 'SELECT * FROM mapdb WHERE id=:id';
const count_sql  = 'SELECT COUNT(*) FROM mapdb WHERE id=:id';
const insert_sql = 'INSERT INTO mapdb VALUES(:id, :loc)';
const update_sql = 'UPDATE mapdb SET loc=:loc WHERE id=:id';

# POSTされてきたデータの受け取り（decode）
$json = file_get_contents("php://input"); # POST されてきた jsonを受け取る
$submit = json_decode($json, true);
$action = $submit['action'];
$id = $submit['id'];

# ここから Database 接続と処理
try {
  $pw = 'wapppass';
  #$pw = file_get_contents('/home/aki/html/DBpw');
  # databaseに接続するための PDO オブジェクトを作成
  $pdo = new PDO(
    "mysql:dbname=webdb;host=localhost;charset=utf8mb4", #dsn
    "webapp", # username
    $pw, # password
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]  # driver_options
  );

  create_table($pdo); # テーブルがないなら作成

  # コントローラ（あるいはdispatcherとして）の処理
  switch($action) {
    case 'retrieve': # DBから読み込み
      $loc = retrieve_line($pdo, $id);
      $data = [ 'id' => $id, 'loc' => $loc];
      $json = json_encode($data);
      break;
    case 'store': # DBに保存
      $loc = $submit['loc'];
      $ret = store_line($pdo, $id, $loc);
      $json = json_encode($ret);
      break;
    default:
      # error
  }
  header('Content-Type: application/json; charset=UTF-8');
  print($json);
} catch (PDOException $e) {
  // DB error (via PDO)
  header('Content-Type: text/plain; charset=UTF-8', true, 500);
  exit($e->getMessage());
}

# 以下、DB操作のための関数群
function create_table($pdo) {
  $st = $pdo->query('CREATE TABLE IF NOT EXISTS mapdb(id INT PRIMARY KEY, loc JSON, CHECK (JSON_VALID(loc)))');
}

function store_line($pdo, $id, $loc) {
  $value = [':id'=> $id, ':loc' => json_encode($loc) ];
  if (is_exist($pdo, $id))
    $st = $pdo->prepare(update_sql);
  else
    $st = $pdo->prepare(insert_sql);
  $ret = $st->execute($value);
}

function retrieve_line($pdo, $id) {
  $st = $pdo->prepare(select_sql);
  $rs = $st->execute([':id' => $id]);
  $line = $st->fetch();
  if ($line == false) $line['loc'] = '[]'; # DB中に存在しない場合
  return json_decode($line['loc']);
}
function is_exist($pdo, $id) {
  $st = $pdo->prepare(count_sql);
  $rs = $st->execute([':id' => $id]);
  return $st->fetchColumn() == 1 ? true: false;
}

?>