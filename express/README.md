# Architecture
Clean Architecture思想に基づいた、フレームワークなどのツールが、コアとなるビジネスロジックに依存されない形を作りたかった
### model（domain）
ビジネスロジックに当たる部分、モデルの型定義や、どれにも依存しない共通認識部分を記述

### usecase（application）
どんな処理の流れになるのか記述する。repositoryなどを使用するが、直接は呼ばず、引数として持ってきて、そのインスタンスを呼ぶ形

### interfaces
- controller
どのusecase, repositoryを使用するか決め、最終的にpresenterで加工したデータを返却する
今回に関して、RailsではなくExpressを使用しており、ApplicationControllerを継承するみたいな形が確立されていないため、実際にデータを返すのはrouter/index.ts（ファイル名、切り分けは仮）の中に記述するが、router/index.tsではもらったデータをそのままres.json的なことをするだけ

- repository
DB APIや、外部APIを叩くための場所

- presenter
データ加工場。共通認識の場合はmodelにgetterなどで定義するのはいいが、viewに渡すに際して必要な加工はビジネスロジックの共通認識から外れるのでそういう場合はpresenterに書く。というかviewに渡すためのデータ加工をここで行う。

### infra
routerの記述など、libの部分もここに書いていいかも、外部ライブラリ等に依存しながら共通認識として使用される部分はここに書いていい、ErrorのlibもPrismaのError名に準拠するところがあるから、基本的に外部ライブラリ依存するlibはここ

- エンドポイントを受け取るとり、特定の処理機関に渡す（router）
- 必要な処理、メソッドを呼び出す（controller）
- データの整合性を確かめる必要がある（usecase）
- そもそもデータの型はどうなっているのか？（model）
- どんな形に成形するか（presenter）
