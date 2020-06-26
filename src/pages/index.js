import React from 'react';
import Nav from "react-bootstrap/Nav";
import Layout from '../components/Layout';
import PageFooter from '../components/PageFooter';
import SideBar from '../components/SideBar';

import Scroll from '../components/Scroll';

const sections = [
  { id: 'top', name: 'Intro', icon: 'fa-home' },
  { id: 'portfolio', name: 'Portfolio', icon: 'fa-th' },
  { id: 'about', name: 'About Me', icon: 'fa-user' },
];

const IndexPage = () => (
  <Layout>
    <SideBar sections={sections} />

    <div id="main">
      <section id="top" className="one dark cover">
        <div className="container">
          <header>
            <h2 className="alt">
              Hi! I'm <strong>Rob</strong>
              <br />
              An aspiring web developer
            </h2>
            <p>Please checkout a few of my projects</p>
          </header>

          <footer>
            <Scroll type="id" element={'portfolio'}>
              <a href="#portfolio" className="button">
                Show me
              </a>
            </Scroll>
          </footer>
        </div>
      </section>

      <section id="portfolio" className="two">
        <div className="container">
          <header>
            <h2>Portfolio</h2>
          </header>
          <p>
            Most of my projects revolve around the MERN (Mongo Express React Node) technology stack.
          </p>
          <Nav.Link href="https://foestauf.me/yeast-calc">Yeast Calculator</Nav.Link>
          <Nav.Link href="https://foestauf.me/Pomodoro-clock">Pomodoro Clock</Nav.Link>
        </div>
      </section>

      <section id="about" className="three">
        <div className="container">
          <header>
            <h2>About Me</h2>
          </header>


          <p>
            I have often worked around, on, or near computers throughout most of
            my life. While deployed to Iraq in 2003 I had a C++ book shipped to
            me. I started my first attempt to teach myself coding. At that time
            I didn't latch on with everything else that was going on around me.
            Fast forward to 2019 my wife noticed I was pretty tech savy with
            computers and encouraged me to try my hand at coding. So here we
            are. My first baby steps into the dev world.
          </p>
        </div>
      </section>

    </div>

    <PageFooter />
  </Layout>

);

export default IndexPage;
