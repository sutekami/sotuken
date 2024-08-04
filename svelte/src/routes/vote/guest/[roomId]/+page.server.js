export function load({params}) {
  // TODO: 参加者の方も存在しないroomIdにアクセスしたときはページが存在しない
  // TODO: エラーを吐くようにする
  return {
    roomId: params.roomId,
  };
}
