// PAGE: Landing Page
// This is the first page anyone sees when they visit the app before they log in.
// It introduces the app, shows its key features,
// and has two buttons — one to Sign Up and one to Sign In.
// Route: /
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
import Hero from '/src/assets/homepage/hero.svg'
import sendIcon from '/src/assets/homepage/send-icon.svg'
import Fast from '/src/assets/homepage/FAST.svg'
import Safety from '/src/assets/homepage/SAFETY.svg'
import Trading from '/src/assets/homepage/TRADING.svg'
import Map from '/src/assets/homepage/map.svg'
import CloserArrowRight from '/src/assets/homepage/closerArrowRight.svg'
import hdiw1 from '/src/assets/homepage/hdiw(1).svg'
import hdiw2 from '/src/assets/homepage/hdiw(2).svg'
import hdiw3 from '/src/assets/homepage/hdiw(3).svg'
import hdiw4 from '/src/assets/homepage/hdiw(4).svg'
import SendTo from '/src/assets/homepage/sendTo.svg'
import Transfer from '/src/assets/homepage/TRANSFER.svg'
import FastWay from '/src/assets/homepage/fastestWay.svg'
import NewsImg1 from '/src/assets/homepage/newsCard(0).svg'
import NewsImg2 from '/src/assets/homepage/newsCard(1).svg'
import Download from '/src/assets/homepage/DOWNLOAD.svg'
import Ggl from '/src/assets/homepage/ggl.svg'
import Apl from '/src/assets/homepage/apl.svg'
import Star from '/src/assets/homepage/fullStar.svg'
import hStar from '/src/assets/homepage/halfStar.svg'
import Selector from './CurrencySelector'
import RSelector from './RCurrencySelector'

function LandingPage() {
  const [amount, setAmount] = useState(500)
  const [currency, setCurrency] = useState('UK')
  const [method, setMethod] = useState('BankTransfer')
  const [receive, setRAmount] = useState(850000)
  const [rcurrency, setRcurrency] = useState('NGN')

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleRAmountChange = (e) => {
    setRAmount(e.target.value)
  }

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  const handleRCurrencyChange = (e) => {
    setRcurrency(e.target.value)
  }

  const handleMethodChange = (e) => {
    setMethod(e.target.value)
  }

  return (
    <div className={styles.container}>
      <nav>
        <h2 className={styles.logo}>Cosmo Remit</h2>
        <div className={styles.buttonDiv}>
          {/* Login button — links to Sign In page */}
          <Link to="/signin">
            <button className={styles.login}>Log in</button>
          </Link>
          {/* Register button — links to Sign Up page */}
          <Link to="/signup">
            <button className={styles.register}>Register</button>
          </Link>
        </div>
      </nav>

      <header className={styles.hero}>
        <img className={styles.heroImg} src={Hero} alt="" />
        <div className={styles.heroOverlay}>
          <div className={styles.left}>
            <h1>Send Money <br /> </h1>
            <h1 className={styles.leftBottom}><span>without</span> Borders</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero non, condimentum sagittis mauris. Ut molestie euismod neque. Proin eget odio</p>
          </div>
          <div className={styles.right}>
            <div className={styles.rate}>
              <div className={styles.leftRate}>
                <h3>Rate</h3>
                <p>Best rate guarantee</p>
              </div>
              <div className={styles.rightRate}>
                <h2>1 UK = NGN 1700</h2>
              </div>
            </div>
            <div className={styles.amount}>
              <div className={styles.inputGroup}>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder=" "
                />
                <label htmlFor="amount">You send</label>
              </div>
              <Selector value={currency} onChange={handleCurrencyChange} />
            </div>
            <div className={styles.method}>
              <select
                name="payment-method"
                id="payment-method"
                value={method}
                onChange={handleMethodChange}
                className={styles.selectMethod}
              >
                <option value="BankTransfer">Bank Transfer</option>
                <option value="CardPayment">Card Payment</option>
              </select>
              <label htmlFor="currency" className={styles.floatingLabel}>Currency</label>
            </div>
            <div className={styles.charges}>
              <div>
                <div></div>
                <p>Charges</p>
              </div>
              <div>0</div>
            </div>
            <div className={styles.recieve}>
              <div className={styles.inputGroup}>
                <input
                  type="number"
                  id="amount"
                  value={receive}
                  onChange={handleRAmountChange}
                  placeholder=" "
                />
                <label htmlFor="amount">Recipient gets</label>
              </div>
              <RSelector value={rcurrency} onChange={handleRCurrencyChange} />
            </div>
            <div className={styles.sendBtn}>
              {/* Send button — links to Sign Up page */}
              <Link to="/signup">
                <button>Send <img src={sendIcon} alt="" /></button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.convince}>
        <div className={styles.convinceHeading}>
          <h1>Why choose Frica Xchange</h1>
        </div>
        <div className={styles.convinceCards}>
          <div className={styles.convinceCard}>
            <img src={Fast} alt="" />
            <div>
              <h2>Extremely Fast</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero</p>
            </div>
          </div>
          <div className={styles.convinceCard}>
            <img src={Trading} alt="" />
            <div>
              <h2>Unbeatable Rates</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero</p>
            </div>
          </div>
          <div className={styles.convinceCard}>
            <img src={Safety} alt="" />
            <div>
              <h2>Secure & Regulated</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.closer}>
        <div className={styles.closerContainer}>
          <img src={Map} alt="" />
          <div className={styles.closerInfo}>
            <h2>We are closer than you think</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero non, condimentu</p>
            {/* Register button — links to Sign Up page */}
            <Link to="/signup">
              <button className={styles.registerBtn}>
                Register <img src={CloserArrowRight} alt="" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.howSection}>
        <div className={styles.howSectionHeading}>
          <h2>How Does It Work?</h2>
        </div>
        <div className={styles.howSectionContent}>
          <div className={styles.howCard}>
            <img src={hdiw1} alt="" />
            <h2>Sign Up</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor,</p>
          </div>
          <div className={styles.howCard}>
            <img src={hdiw2} alt="" />
            <h2>Get yourself verified</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor,</p>
          </div>
          <div className={styles.howCard}>
            <img src={hdiw3} alt="" />
            <h2>Add a beneficiary</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor,</p>
          </div>
          <div className={styles.howCard}>
            <img src={hdiw4} alt="" />
            <h2>Send money</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor,</p>
          </div>
        </div>
      </section>

      <section className={styles.sendTo}>
        <img src={SendTo} alt="" />
      </section>

      <section className={styles.transfer}>
        <div className={styles.transferContainer}>
          <img src={Transfer} alt="" />
          <div className={styles.transferRight}>
            <div className={styles.transferTop}>
              <h2>
                <span style={{ color: "#E91908" }}>Distance</span> shouldn't stand between you and your money
              </h2>
            </div>
            <div className={styles.transferBottom}>
              <div className={styles.group}>
                <h2>40+</h2>
                <p>Countries</p>
              </div>
              <div className={styles.group}>
                <h2>10K+</h2>
                <p>Customers</p>
              </div>
              <div className={styles.group}>
                <h2>100K+</h2>
                <p>Completed transanctions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.fastWay}>
        <img src={FastWay} alt="" />
        <div className={styles.fastWayContent}>
          <h3>We are the fastest way to</h3>
          <h2>send money abroad</h2>
          {/* Register button — links to Sign Up page */}
          <Link to="/signup">
            <button className={styles.registerBtn}>
              Register <img src={CloserArrowRight} alt="" />
            </button>
          </Link>
        </div>
      </section>

      <section className={styles.news}>
        <div className={styles.newsContainer}>
          <div className={styles.newsHeading}>
            <h2>News & FAQ</h2>
          </div>
          <div className={styles.newsBody}>
            <div className={styles.newsLeft}>
              <div className={styles.newsCard}>
                <img src={NewsImg1} alt="" />
                <div className={styles.cardBottom}>
                  <h3>Nigerian Naira reduces it's value....</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor,</p>
                </div>
              </div>
              <div className={styles.newsCard}>
                <img src={NewsImg2} alt="" />
                <div className={styles.cardBottom}>
                  <h3>Nigerian Naira reduces it's value....</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor,</p>
                </div>
              </div>
            </div>
            <div className={styles.newsRight}>
              <details>
                <summary>How do I create an account?</summary>
                <div className={styles.newsDetailsContent}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero non, condimentu</p>
                </div>
              </details>
              <details>
                <summary>How do I reset my password?</summary>
                <div className={styles.newsDetailsContent}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero non, condimentu</p>
                </div>
              </details>
              <details>
                <summary>How do I change my personal details?</summary>
                <div className={styles.newsDetailsContent}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero non, condimentu</p>
                </div>
              </details>
              <details>
                <summary>How do I contact support staff?</summary>
                <div className={styles.newsDetailsContent}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero non, condimentu</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.download}>
        <div className={styles.downloadLeft}>
          <h2>Get the app</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eros tortor, consectetur eget libero non, condimentum sagittis</p>
          <div className={styles.downloadBtns}>
            <button>
              <img src={Apl} alt="" />
              <div>
                <span>Download on the</span>
                <h4>App Store</h4>
              </div>
            </button>
            <button>
              <img src={Ggl} alt="" />
              <div>
                <span>Get it on</span>
                <h4>Google Play</h4>
              </div>
            </button>
          </div>
          <div className={styles.downloadStars}>
            <img src={Star} alt="" />
            <img src={Star} alt="" />
            <img src={Star} alt="" />
            <img src={Star} alt="" />
            <img src={hStar} alt="" />
          </div>
          <p className={styles.downloadRatings}>4.8/5 Rating on Google reviews</p>
        </div>
        <div className={styles.downloadRight}>
          <img src={Download} alt="" />
        </div>
      </section>

      <section className={styles.newsletter}>
        <h2>Subscribe to our rates alert</h2>
        <div>
          <input type="email" placeholder='Type your email address' />
          <button>Subscribe</button>
        </div>
      </section>

    </div>
  )
}

export default LandingPage
