export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      {/* <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg shadow-lg">自己紹介</h1> */}
      
      <p className="mb-4">
        こんにちは！<br />
        このページをご覧いただきありがとうございます。<br />
        当ブログを運営している Tokkun です。
      </p>
      
      <p className="mb-6">
        このページでは私の自己紹介と、このブログを始めた理由について書いてみたいと思います。
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 bg-green-100 text-green-800 py-2 px-4 rounded-lg border-l-4 border-green-500">自己紹介</h2>
      <p className="mb-4">
        私は現在、オーストラリアのブリスベンにある QUT（クイーンズランド工科大学） の大学院に正規留学をしており、コンピューターサイエンスを専攻しています。
      </p>
      <p className="mb-4">
        もともとは日本の文系大学を卒業後、ごく普通のサラリーマンとして働いていましたが海外留学したいという思いから社会人を辞め、IT系の学部への留学に挑戦することにしました。
      </p>
      <p className="mb-6">
        プログラミングなどの技術的なバックグラウンドはほとんどなく、ゼロからのスタートをしましたがなんとか留学生活を乗り切っています。
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 bg-green-100 text-green-800 py-2 px-4 rounded-lg border-l-4 border-green-500">ブログを始めたきっかけ</h2>
      <p className="mb-4">
        このブログは自分のプログラミングの経験のため、自分で1から作ってみたものです。
      </p>
      <p className="mb-6">
        もともと留学についての情報発信には興味があったのですが、プログラミングの勉強も兼ねてそれができるといいなと思ったのでブログを始めることにしました。<br />
        自分の技術力の向上という目的もあり運用しながらサイトを改善していきたいと思っているので、ブログの見た目や機能はちょくちょく変わるかもしれません。
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 bg-green-100 text-green-800 py-2 px-4 rounded-lg border-l-4 border-green-500">ブログの内容</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>大学院での学びや留学生活について</li>
        <li>ブリスベンでの現地生活について</li>
        <li>個人的なつぶやき</li>
      </ul>
      <p className="mb-6">
        などなど、情報発信や、あるいはちょっとした個人的な日記のような内容を気ままに書いていくと思います。
      </p>

      <p>
        気軽に見てもらえるとうれしいです。
        <br />お問い合わせ、質問などがありましたら以下の管理人のXアカウントからご連絡ください。
      </p>

      <p className="mt-8 text-center">
        <a
          href="https://x.com/drinkwatching?s=21"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X（旧Twitter）アカウント"
          className="inline-block hover:opacity-70 transition"
        >
          <img src="/x-logo.png" alt="X（旧Twitter）" width={32} height={32} />
        </a>
      </p>
    </main>
  );
} 