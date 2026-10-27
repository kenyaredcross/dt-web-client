export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dt-footer">
      <div className="dt-footer-inner">
        {/* Brand + tagline */}
        <div className="ft-brand">
          <a className="ft-logo" href="/">
            <b>Digital Transformation <i>DT.</i></b>
          </a>
          <p className="ft-tagline">
            Connecting people, data and technology so Kenya Red Cross can reach
            communities faster, in every county.
          </p>
        </div>

        {/* Nav columns */}
        <div className="ft-cols">
          <div className="ft-col">
            <span className="ft-col-head">Explore</span>
            <a href="/blog">Blog</a>
            <a href="/projects">Projects</a>
            <a href="/team">Team</a>
          </div>
          <div className="ft-col">
            <span className="ft-col-head">Organisation</span>
            <a href="https://www.redcross.or.ke" target="_blank" rel="noopener">Kenya Red Cross</a>
            <a href="https://www.redcross.or.ke/about" target="_blank" rel="noopener">About KRCS</a>
            <a href="https://www.redcross.or.ke/donate" target="_blank" rel="noopener">Donate</a>
          </div>
          <div className="ft-col">
            <span className="ft-col-head">Contact</span>
            <a href="/contact">Get in touch</a>
            <a href="/contact?type=Book+a+Demo">Book a Demo</a>
            <a href="mailto:developer@redcross.or.ke">developer@redcross.or.ke</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <span>© {year} Kenya Red Cross Society. Digital Transformation Department.</span>
        <span className="ft-bottom-right">Built in Nairobi.</span>
      </div>
    </footer>
  );
}
