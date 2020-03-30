import React from 'react';
import '../App.css'

export class LandingPage extends React.Component {

render() {
    return(
      <div>
        <header className="py-5 bg-image-full" />
        <section className="py-5">
        <div className="container">
          <h1>GA SHARK PRESENTS: A.L.F.R.E.D</h1>
          <p className="lead">Adult | Life | Finance | Related | Education | Demo</p>
          <p>Did you ever grow up and not learn how to manage money? Well look no further as ALFRED is here to help.</p>
        </div>
      </section>
        <img className="img-fluid d-block mx-auto" src="/images/afg-online-corporate-graphic-02.png" alt=""/>
        <section className="py-5">
        <div className="container">
          <h1>Key Knowledge Areas</h1>
          <p className="lead">What Will you learn? </p>
          <p>Within the application you will have access to our proprietary software that will dynamically create cashflow, mortgage and asset management models for you to learn and see how your daily finances can be improved.</p>
        </div>
      </section>
      <section className="py-5 bg-image-full">
      <img className="img-fluid d-block mx-auto" src="/images/cognitive-technology-finance.jpg" alt=""/>
      </section>
      </div>
    )
}
}