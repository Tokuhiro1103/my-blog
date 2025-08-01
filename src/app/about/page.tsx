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
        現在、オーストラリア・ブリスベンにある QUT（クイーンズランド工科大学） の大学院に正規留学をしていて、Master of Information Technology を専攻しています。
      </p>
      <p className="mb-4">
        もともとは日本の文系大学を卒業後、普通に就職して働いていましたがエンジニアを目指したいという思いから社会人をを辞め、IT学部への留学に挑戦することにしました。
      </p>
      <p className="mb-6">
        プログラミングなどの技術的なバックグラウンドはほとんどなく、ゼロからのスタートでしたがなんとか留学生活を乗り切っています。
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 bg-blue-100 text-blue-800 py-2 px-4 rounded-lg border-l-4 border-blue-500">ブログを始めたきっかけ</h2>
      <p className="mb-4">
        このブログは自分のプログラミングの経験のため、自分で1から作ってみたものです。
      </p>
      <p className="mb-6">
        もともと留学についての情報発信には興味があったのですが、プログラミングの勉強も兼ねてそれができるといいなと思ったのでブログを始めることにしました。<br />
        自分の技術力の向上という目的もあるので、ブログの見た目や機能はちょくちょく変わるかもしれません（し、変わらないかもしれません）
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 bg-purple-100 text-purple-800 py-2 px-4 rounded-lg border-l-4 border-purple-500">ブログの内容</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>大学院での学びや留学生活について</li>
        <li>ブリスベンでの現地生活について</li>
        <li>個人的なつぶやき</li>
      </ul>
      <p className="mb-6">
        などなど、情報発信や、あるいはちょっとした個人的な日記のような内容を気ままに書いていくと思います。
      </p>

      <p className="text-lg">
        気軽に見てもらえるとうれしいです。
      </p>
    </main>
  );
} 