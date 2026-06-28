"use client";

import { useState } from "react";

const traps = [
  {
    number: "01",
    title: "不承諾，卻不放妳走",
    copy: "他保留所有單身的自由，妳卻負責提供女朋友的待遇。",
  },
  {
    number: "02",
    title: "什麼都做了，只差名分",
    copy: "聊天、約會、過夜、想念都有。一問「我們算什麼」，他就開始裝死。",
  },
  {
    number: "03",
    title: "知道他在拖，還是不敢走",
    copy: "妳怕前面的投入全部白費；他的人生繼續往前，妳的人生卻被按下暫停。",
  },
  {
    number: "04",
    title: "斷聯很多次，最後都破功",
    copy: "他只要問一句「最近好嗎」，妳前面撐過的全部歸零。",
  },
];

const stages = [
  {
    no: "01",
    label: "IDENTIFY",
    title: "先看懂，妳掉進哪一種局",
    copy: "不再聽他怎麼說，先看他怎麼用妳。辨認免費女友、情緒垃圾桶、過渡品、多線發展，或一段還有推進空間的關係。",
    points: ["他拿走了什麼", "妳免費提供了什麼", "這一局還有沒有救"],
  },
  {
    no: "02",
    label: "WITHDRAW",
    title: "停止免費供應",
    copy: "收回不對等的情侶待遇，調整訊息與見面頻率，設下界線，測試他願不願意付出時間、行動和成本。",
    points: ["停止隨傳隨到", "拒絕深夜臨時邀約", "讓他的反應開始說真話"],
  },
  {
    no: "03",
    label: "OBSERVE",
    title: "處理斷聯、復聯與拉扯",
    copy: "他回來，不代表他變了。妳會知道哪些訊息只是測試妳還能不能用，以及什麼行動才算真正的改變。",
    points: ["看懂廉價復聯", "處理戒斷與不甘心", "不再一回頭就回到原位"],
  },
  {
    no: "04",
    label: "DECIDE",
    title: "該推進就推進，該清掉就清掉",
    copy: "有機會的關係，設定期限、談清需求；沒有價值的關係，停止反覆研究，把生活和選擇權拿回來。",
    points: ["分辨承諾與畫餅", "做最後一次判斷", "不再愛上同一種垃圾"],
  },
];

const benefits = [
  ["01", "壞男套路拆解內容", "真實案例、地下關係結構與男人常用話術，持續更新。"],
  ["02", "壞男話術翻譯機", "把他說過的話貼進去，直接翻成正常人聽得懂的白話。"],
  ["03", "真實匿名案例拆解", "看別人的局，照見自己的盲點；直接判斷哪裡有救、哪裡該停。"],
  ["04", "關係公式與行動工具", "驗屍表、免費待遇檢查、復聯判斷、攤牌準備與退場防復發。"],
  ["05", "會員直播與完整回放", "關係判斷、訊息拆解、翻盤可能與停損時機，錯過也能看回放。"],
  ["06", "會員社群與案例對照", "不集體灌雞湯。只看行動、成本、主導權與下一步。"],
  ["07", "1 對 1 診斷優先預約", "複雜或緊急的局，可另外申請私聊診斷與深度陪跑。"],
];

const comparisons = [
  ["每天等他的訊息", "看得懂他的行為"],
  ["他一冷淡就焦慮", "不再被冷熱牽著跑"],
  ["不敢問，又不甘心", "知道何時觀察、攤牌、停損"],
  ["他一回頭就心軟", "只認成本與實際行動"],
  ["反覆掉進同一種劇情", "提早辨認，拿回選擇權"],
];

const faqs = [
  [
    "這是無限次一對一諮詢嗎？",
    "不是。會員社群負責教妳看懂局、提供工具與案例；需要完整客製化處理時，可另外申請付費一對一診斷，會員享優先預約。",
  ],
  [
    "加入後，能保證他愛上我嗎？",
    "不能，也不會用這種話騙妳。我們要做的是讓妳看懂真實意圖、停止不對等付出，並做出對自己有利的決定。",
  ],
  [
    "我只想先處理眼前這個男人，可以月訂嗎？",
    "可以。月訂適合先拆眼前這一局；年訂更適合修正反覆出現的選人、界線與互動模式。",
  ],
  [
    "內容會很溫柔地安慰我嗎？",
    "凡氏會把話講清楚。有些答案不好聽，但通常比繼續被同一個男人騙一年便宜。",
  ],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="sales-page">
      <nav className="sales-nav" aria-label="頁面導覽">
        <a className="wordmark" href="#top" aria-label="凡氏可行 | 地下會社首頁">
          <span>凡氏</span>
          <b>凡氏可行 | 地下會社</b>
        </a>
        <a className="nav-cta" href="#plans">
          查看會員方案 <ArrowIcon />
        </a>
      </nav>

      <section className="sales-hero" id="top">
        <div className="hero-noise" />
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-content">
          <p className="kicker"><span /> YEAR-LONG RELATIONSHIP INTELLIGENCE</p>
          <h1>
            妳不是看不懂。
            <br />
            妳只是每次看懂後，
            <br />
            <em>又被他哄回去。</em>
          </h1>
          <p className="hero-lead">
            一整年，陪妳看懂男人、拆掉爛局，
            <br className="desktop-only" />
            把被他捏在手上的主導權拿回來。
          </p>
          <div className="hero-actions">
            <a className="main-cta" href="#plans">
              我要看會員方案 <ArrowIcon />
            </a>
            <a className="text-link" href="#problem">先看看我是不是也在局裡</a>
          </div>
        </div>
        <div className="hero-proof">
          <p>妳缺的不是更多感情雞湯。</p>
          <strong>妳缺的是有人直接告訴妳：<br />這個男人，到底在玩什麼。</strong>
        </div>
        <div className="scroll-mark"><span /> SCROLL TO FACE THE TRUTH</div>
      </section>

      <section className="marquee" aria-label="常見關係警訊">
        <div>
          <span>不承諾</span><i>✦</i><span>不放手</span><i>✦</i><span>不負責</span><i>✦</i>
          <span>卻要妳忠誠</span><i>✦</i><span>不承諾</span><i>✦</i><span>不放手</span><i>✦</i>
        </div>
      </section>

      <section className="problem-section section-pad" id="problem">
        <div className="section-heading split-heading">
          <div>
            <p className="kicker"><span /> THE SITUATION</p>
            <h2>妳是不是也卡在<br />這些狀況？</h2>
          </div>
          <p>文章說不要戀愛腦、不要倒貼、沒有名分就離開。道理妳都懂，事情發生在自己身上，妳還是做不到。</p>
        </div>
        <div className="trap-grid">
          {traps.map((trap) => (
            <article className="trap-card" key={trap.number}>
              <span className="trap-number">{trap.number}</span>
              <div>
                <h3>{trap.title}</h3>
                <p>{trap.copy}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="pull-quote">
          <p>最慘的不是他還沒選妳。</p>
          <strong>是妳的人生已經被他按下暫停，<br />他卻從來沒有停下來等妳。</strong>
        </div>
      </section>

      <section className="truth-section section-pad">
        <div className="truth-panel">
          <div className="truth-copy">
            <p className="kicker light"><span /> THE TRANSLATOR</p>
            <h2>他說的，和他真正的意思，<br />常常不是同一件事。</h2>
          </div>
          <div className="translation-card">
            <div className="translation-line">
              <span>他說</span>
              <p>「我現在真的沒有辦法談感情。」</p>
            </div>
            <div className="translation-divider"><span>翻譯</span></div>
            <div className="translation-line answer">
              <span>白話</span>
              <p>「我不想對妳負責，但妳願意繼續陪我，我也不會拒絕。」</p>
            </div>
          </div>
        </div>
      </section>

      <section className="year-section section-pad" id="method">
        <div className="section-heading split-heading">
          <div>
            <p className="kicker"><span /> WHY A FULL YEAR</p>
            <h2>地下關係，<br />不會四週就結束。</h2>
          </div>
          <div className="side-copy">
            <p>這個月他已讀不回；下個月他突然回來；等妳冷靜一點，他又說「其實我一直都很在乎妳」。</p>
            <p>真正困難的不是把他看懂一次，而是每次他換一種方式回來搞妳，妳都不再被拉回原位。</p>
          </div>
        </div>
        <div className="stage-list">
          {stages.map((stage) => (
            <article className="stage-row" key={stage.no}>
              <div className="stage-index">{stage.no}</div>
              <div className="stage-main">
                <span>{stage.label}</span>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </div>
              <ul>
                {stage.points.map((point) => <li key={point}><CheckIcon />{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="benefit-section section-pad" id="inside">
        <div className="section-heading centered-heading">
          <p className="kicker"><span /> INSIDE THE SOCIETY</p>
          <h2>加入會員，<br />妳會拿到什麼？</h2>
          <p>不是再丟一堆道理給妳。是當局面發生時，妳手上真的有東西可以拆。</p>
        </div>
        <div className="benefit-grid">
          {benefits.map(([no, title, copy], index) => (
            <article className={`benefit-card ${index === 0 ? "featured" : ""}`} key={no}>
              <span>{no}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <i>＋</i>
            </article>
          ))}
        </div>
      </section>

      <section className="change-section section-pad">
        <div className="change-head">
          <p className="kicker light"><span /> BEFORE / AFTER</p>
          <h2>不是讓他選妳。<br /><em>是讓妳重新有得選。</em></h2>
        </div>
        <div className="change-table">
          <div className="change-labels"><span>加入前</span><span>加入後</span></div>
          {comparisons.map(([before, after]) => (
            <div className="change-row" key={before}>
              <p>{before}</p>
              <div className="change-arrow"><ArrowIcon /></div>
              <strong>{after}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="fit-section section-pad">
        <div className="fit-column good-fit">
          <p className="kicker"><span /> FOR YOU</p>
          <h2>這裡適合妳，如果妳——</h2>
          <ul>
            {[
              "長期卡在曖昧、炮友或地下關係",
              "明知道有問題，還是會心軟",
              "受夠每天猜他到底在想什麼",
              "願意面對真相，也願意照著方法執行",
              "想用一年修正自己的判斷與界線",
            ].map((item) => <li key={item}><CheckIcon />{item}</li>)}
          </ul>
        </div>
        <div className="fit-column bad-fit">
          <p className="kicker"><span /> NOT FOR YOU</p>
          <h2>這裡不適合妳，如果妳——</h2>
          <ul>
            {[
              "只想找人陪妳一起罵男人",
              "希望我們保證某個男人愛上妳",
              "只想學幾句話術操控或報復",
              "拿到答案後，還是選擇繼續裝瞎",
              "想把社群當成無限次免費一對一",
            ].map((item) => <li key={item}><span>×</span>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="plans-section section-pad" id="plans">
        <div className="plans-heading">
          <p className="kicker light"><span /> MEMBERSHIP</p>
          <h2>妳可以繼續猜。<br />也可以從今天開始，<em>只看證據。</em></h2>
        </div>
        <div className="pricing-grid">
          <article className="price-card monthly">
            <div className="plan-top">
              <span>月訂閱</span>
              <p>適合先進入社群，開始處理眼前這一局。</p>
            </div>
            <div className="price"><small>US$</small><strong>200</strong><span>／月</span></div>
            <ul>
              {["全部會員限定內容", "話術翻譯與關係工具", "直播、回放與會員社群", "一對一服務優先預約"].map((item) => <li key={item}><CheckIcon />{item}</li>)}
            </ul>
            <a className="price-cta outline" href="https://www.skool.com/underground-society" target="_blank" rel="noreferrer">選擇月訂閱 <ArrowIcon /></a>
          </article>
          <article className="price-card annual">
            <div className="recommend-tag">最推薦・省下 US$900</div>
            <div className="plan-top">
              <span>年訂閱</span>
              <p>適合徹底修正反覆出現的判斷、界線與互動模式。</p>
            </div>
            <div className="price"><small>US$</small><strong>1,500</strong><span>／年</span></div>
            <div className="saving">
              <span>等於每月 US$125</span>
              <b>比月訂閱便宜 37.5%</b>
            </div>
            <ul>
              {["包含月訂閱的所有內容", "完整一年的會員資格", "陪妳走過曖昧、升溫、復聯到停損", "練到不用別人提醒，也能看懂局"].map((item) => <li key={item}><CheckIcon />{item}</li>)}
            </ul>
            <a className="price-cta solid" href="https://www.skool.com/underground-society" target="_blank" rel="noreferrer">選擇年訂閱 <ArrowIcon /></a>
          </article>
        </div>
        <p className="price-note">一個月，讓妳看懂眼前這一局。<strong>一整年，讓妳不再掉進同一種局。</strong></p>
      </section>

      <section className="faq-section section-pad">
        <div>
          <p className="kicker"><span /> BEFORE YOU JOIN</p>
          <h2>加入前，<br />妳可能還想問。</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{question}</strong>
                <i>＋</i>
              </button>
              <div><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-section" id="confirm">
        <div className="final-ring" />
        <p className="kicker light"><span /> TAKE BACK CONTROL</p>
        <h2>難聽的答案，<br />通常都比繼續被同一個男人<br /><em>騙一年便宜。</em></h2>
        <p>如果妳準備好了，現在就告訴凡氏：<br />「我想把主導權拿回來。」</p>
        <a className="main-cta" href="https://www.skool.com/underground-society" target="_blank" rel="noreferrer">前往地下會社 <ArrowIcon /></a>
        <div className="final-meta">
          <span>凡氏可行 | 地下會社</span>
          <span>全年會員制・會員限定</span>
        </div>
      </section>

      <footer>
        <div className="wordmark"><span>凡氏</span><b>凡氏可行 | 地下會社</b></div>
        <p>看懂男人，拆掉爛局，拿回主導權。</p>
      </footer>
    </main>
  );
}
