import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/partner-program.css";

const TrainingPartnerPage = () => {
  // Inquiry form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    experience: "Gym Owner / Fitness Professional",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city) {
      toast.error("Please fill in your Name, Phone Number, and City.");
      return;
    }

    // Direct to WhatsApp or submit
    const textMessage = `Hello INPTA Team,%0A%0AI am interested in becoming an Authorized Training Partner.%0A%0A*Name:* ${encodeURIComponent(
      formData.name
    )}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(
      formData.email
    )}%0A*City:* ${encodeURIComponent(formData.city)}%0A*Profile:* ${encodeURIComponent(
      formData.experience
    )}%0A*Message:* ${encodeURIComponent(formData.message || "Interested in City Partnership")}`;

    window.open(`https://api.whatsapp.com/send?phone=918866842520&text=${textMessage}`, "_blank");
    toast.success("Thank you! Your inquiry has been submitted. Opening WhatsApp...");
    setFormSubmitted(true);
  };

  return (
    <div className="partner-page-wrapper">
      <Helmet>
        <title>Training Partner Program | INPTA Authorized City Accreditation</title>
        <meta
          name="description"
          content="Join the INPTA Authorized City Accreditation Partner Program. Build a profitable fitness education academy in your city with 100% job placement, proven curriculum, and end-to-end backend support."
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="tp-hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-start mb-5 mb-lg-0">
              <span className="tp-badge-pill">
                <i className="fas fa-award me-2"></i> AUTHORIZED CITY ACCREDITATION PARTNER PROGRAM
              </span>
              <h1 className="tp-hero-title">
                Build the Future of <span>Fitness Education</span> Across India
              </h1>
              <p className="tp-hero-subtitle">
                A national accreditation opportunity for entrepreneurs, gym owners, and education
                institutions. <strong>One City. One Authorized INPTA Training Center.</strong>
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#apply-now" className="btn btn-warning btn-lg px-4 py-3 fw-bold rounded-pill text-dark">
                  <i className="fas fa-file-signature me-2"></i> Apply for City Partner
                </a>
                <Link to="/training-center-program" className="btn btn-outline-light btn-lg px-4 py-3 fw-bold rounded-pill">
                  <i className="fas fa-building me-2"></i> Explore Training Center
                </Link>
                <Link to="/registration" className="btn btn-primary btn-lg px-4 py-3 fw-bold rounded-pill">
                  <i className="fas fa-arrow-right me-2"></i> Start Registration
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="row g-3">
                <div className="col-6">
                  <div className="tp-stat-pill">
                    <span className="tp-stat-number">100 TP & TC</span>
                    <span className="tp-stat-label">National Network Vision</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="tp-stat-pill">
                    <span className="tp-stat-number">100%</span>
                    <span className="tp-stat-label">Job Placement Record</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="tp-stat-pill">
                    <span className="tp-stat-number">18,000+</span>
                    <span className="tp-stat-label">Students Across India</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="tp-stat-pill">
                    <span className="tp-stat-number">70 : 30</span>
                    <span className="tp-stat-label">Partner Revenue Share</span>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-lg mt-4 bg-white text-dark rounded-4 p-4 text-start">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary text-white rounded-circle p-3 me-3">
                    <i className="fas fa-shield-alt fa-2x"></i>
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold">Exclusive Protected Territory</h5>
                    <small className="text-muted">One Authorized Center Per City</small>
                  </div>
                </div>
                <p className="small text-secondary mb-0">
                  Secure exclusive offline training accreditation rights for your city. Ready-to-launch
                  curriculum, national brand certification, and guaranteed student admissions pipeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About INPTA Ecosystem Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">About INPTA</span>
            <h2 className="tp-section-title">A National Standard for Fitness Education</h2>
            <p className="tp-section-desc">
              Replacing fragmented short courses with a credible national qualification. One curriculum. One certification. Nationwide.
            </p>
          </div>

          <div className="row g-4 text-start">
            <div className="col-md-6 col-lg-3">
              <div className="tp-card">
                <div className="tp-card-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3 className="tp-card-title">1. Vision</h3>
                <p className="tp-card-desc">
                  A certified, highly competent fitness professional in every Indian city, driving health and employment.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="tp-card">
                <div className="tp-card-icon orange">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3 className="tp-card-title">2. Mission</h3>
                <p className="tp-card-desc">
                  Deliver structured, industry-aligned education through accredited city partners with standardized delivery.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="tp-card">
                <div className="tp-card-icon green">
                  <i className="fas fa-certificate"></i>
                </div>
                <h3 className="tp-card-title">3. Why INPTA Exists</h3>
                <p className="tp-card-desc">
                  To eliminate unverified local notes and replace them with gold-standard, research-backed national qualifications.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="tp-card">
                <div className="tp-card-icon">
                  <i className="fas fa-network-wired"></i>
                </div>
                <h3 className="tp-card-title">4. The Ecosystem</h3>
                <p className="tp-card-desc">
                  Academies, faculty, examiners, and fitness employers seamlessly connected on one unified national network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Gap & Opportunity */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Industry Opportunity</span>
            <h2 className="tp-section-title">A Fast-Growing Market Without a Standard</h2>
            <p className="tp-section-desc">
              The fitness boom is spreading across Tier 1, 2, and 3 cities. Demand for trainers is scaling faster than credible institutions can supply them.
            </p>
          </div>

          <div className="row g-4 text-start">
            <div className="col-md-6 col-lg-3">
              <div className="p-4 bg-white rounded-4 border h-100 shadow-sm">
                <div className="text-primary mb-3">
                  <i className="fas fa-chart-line fa-2x"></i>
                </div>
                <h4 className="fw-bold fs-5">Growing Fitness Industry</h4>
                <p className="text-secondary small">
                  Gyms, studios, and wellness centers are rapidly expanding into tier 2 &amp; tier 3 cities nationwide.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="p-4 bg-white rounded-4 border h-100 shadow-sm">
                <div className="text-warning mb-3">
                  <i className="fas fa-user-graduate fa-2x"></i>
                </div>
                <h4 className="fw-bold fs-5">Rising Demand for Trainers</h4>
                <p className="text-secondary small">
                  Fitness employers and gym owners now hire only certified, assessment-backed and practical-tested professionals.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="p-4 bg-white rounded-4 border h-100 shadow-sm">
                <div className="text-danger mb-3">
                  <i className="fas fa-exclamation-triangle fa-2x"></i>
                </div>
                <h4 className="fw-bold fs-5">Missing National Standard</h4>
                <p className="text-secondary small">
                  Most local short courses lack curriculum depth, hands-on practicals, and official quality audit mechanisms.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="p-4 bg-white rounded-4 border h-100 shadow-sm">
                <div className="text-success mb-3">
                  <i className="fas fa-door-open fa-2x"></i>
                </div>
                <h4 className="fw-bold fs-5">Open Market Opportunity</h4>
                <p className="text-secondary small">
                  Few credible academies exist per city. Early accredited partners capture the entire city territory quickly.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-4 bg-primary text-white text-center shadow">
            <h4 className="fw-bold mb-1">The Gap is the Opportunity</h4>
            <p className="mb-0">
              Demand for certified trainers is scaling exponentially. Partner with INPTA to supply certified talent and dominate your city's education market.
            </p>
          </div>
        </div>
      </section>

      {/* Six Reasons Entrepreneurs Choose INPTA */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Why Partner</span>
            <h2 className="tp-section-title">Six Reasons Entrepreneurs Choose INPTA</h2>
            <p className="tp-section-desc">
              Everything you need to operate a high-margin, respected education business with minimal trial-and-error.
            </p>
          </div>

          <div className="row g-4 text-start">
            <div className="col-md-4">
              <div className="tp-card">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-success me-2"><i className="fas fa-check"></i></span>
                  <h4 className="tp-card-title mb-0">Proven Business Model</h4>
                </div>
                <p className="tp-card-desc">
                  A tested and profitable academy format designed for sustained enrollment, not an unverified experiment.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="tp-card">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-success me-2"><i className="fas fa-check"></i></span>
                  <h4 className="tp-card-title mb-0">Established Brand</h4>
                </div>
                <p className="tp-card-desc">
                  Trade on national brand credibility, recognition, and trust from your very first launch day.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="tp-card">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-success me-2"><i className="fas fa-check"></i></span>
                  <h4 className="tp-card-title mb-0">Academic Excellence</h4>
                </div>
                <p className="tp-card-desc">
                  Structured scientific curriculum with textbooks, PPTs, practicals, and real central assessments.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="tp-card">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-success me-2"><i className="fas fa-check"></i></span>
                  <h4 className="tp-card-title mb-0">Complete Backend</h4>
                </div>
                <p className="tp-card-desc">
                  Admissions portal, student exams, certifications, and compliance are fully handled by the central team.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="tp-card">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-success me-2"><i className="fas fa-check"></i></span>
                  <h4 className="tp-card-title mb-0">National Recognition</h4>
                </div>
                <p className="tp-card-desc">
                  Certification that gym owners, fitness clubs, and wellness employers understand, value, and hire from.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="tp-card">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-success me-2"><i className="fas fa-check"></i></span>
                  <h4 className="tp-card-title mb-0">Scalable Business</h4>
                </div>
                <p className="tp-card-desc">
                  Add batches, weekend/weekday courses, masterclasses, and corporate revenue lines seamlessly over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Complete Accreditation Package - 10 Items */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">What You Receive</span>
            <h2 className="tp-section-title">The Complete Accreditation Package</h2>
            <p className="tp-section-desc">
              10 comprehensive pillars included in your accreditation. Everything required to open, run, and grow an accredited training centre.
            </p>
          </div>

          <div className="row g-3 text-start justify-content-center">
            {[
              { num: "01", title: "Official Accreditation", desc: "Authorized city-level accreditation certificate." },
              { num: "02", title: "Brand License", desc: "Use of INPTA trademarks, logos, and marketing badges." },
              { num: "03", title: "Standardized Curriculum", desc: "Complete 6-month & diploma course syllabi and slides." },
              { num: "04", title: "Faculty Training", desc: "Train-the-Trainer certification for your local instructors." },
              { num: "05", title: "Certification System", desc: "Central student exam, grading, and digital/physical certificates." },
              { num: "06", title: "Backend Operations", desc: "Full operational and administrative layer managed by INPTA." },
              { num: "07", title: "Marketing Support", desc: "Ready-to-run creatives, social media playbooks, and lead funnels." },
              { num: "08", title: "Academic Updates", desc: "Ongoing course updates aligned with latest sports science." },
              { num: "09", title: "Student Registration Portal", desc: "Digital enrollment, attendance, and record-keeping system." },
              { num: "10", title: "Billing & Invoicing Support", desc: "Centralized student invoicing and transparent fee processing." },
            ].map((item, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="tp-package-item">
                  <div className="tp-package-num">{item.num}</div>
                  <div>
                    <h4 className="tp-package-title">{item.title}</h4>
                    <small className="text-secondary">{item.desc}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Split - INPTA Delivers vs City Partner Executes */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Business Model</span>
            <h2 className="tp-section-title">How the Partnership Works</h2>
            <p className="tp-section-desc">
              A ready-built academy system: INPTA owns the standard and the systems, the partner owns the city and the students.
            </p>
          </div>

          <div className="roles-container mb-4 text-start">
            <div className="row g-0">
              <div className="col-lg-6 role-column-inpta">
                <div className="role-header-title">
                  <i className="fas fa-university text-warning"></i>
                  <span>INPTA DELIVERS</span>
                </div>
                <ul className="role-list">
                  <li className="role-list-item">
                    <i className="fas fa-check-circle text-warning mt-1"></i>
                    <div>
                      <strong>Curriculum & Study Materials</strong>
                      <div className="small text-white-50">Research-backed books, PPTs, practical guides, and exam sets.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-check-circle text-warning mt-1"></i>
                    <div>
                      <strong>National Certification</strong>
                      <div className="small text-white-50">Audited exams and certificates recognized by fitness employers across India.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-check-circle text-warning mt-1"></i>
                    <div>
                      <strong>Backend & Technical Operations</strong>
                      <div className="small text-white-50">Admissions software, exam evaluation, documentation, and support desk.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-check-circle text-warning mt-1"></i>
                    <div>
                      <strong>Marketing Strategy & Lead Funnel</strong>
                      <div className="small text-white-50">High-converting creatives, ad campaigns, and qualified city inquiries.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-check-circle text-warning mt-1"></i>
                    <div>
                      <strong>Faculty Development Program</strong>
                      <div className="small text-white-50">Pre-launch Train-the-Trainer certification for your teaching staff.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-check-circle text-warning mt-1"></i>
                    <div>
                      <strong>National Brand Credibility & Quality Audit</strong>
                      <div className="small text-white-50">Established brand authority with 18,000+ graduates nationwide.</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="col-lg-6 role-column-partner">
                <div className="role-header-title text-primary">
                  <i className="fas fa-handshake"></i>
                  <span>CITY PARTNER EXECUTES</span>
                </div>
                <ul className="role-list">
                  <li className="role-list-item">
                    <i className="fas fa-arrow-right text-primary mt-1"></i>
                    <div>
                      <strong>Local Office & Training Center Facility</strong>
                      <div className="small text-secondary">Classroom setup and gym floor access for practical training.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-arrow-right text-primary mt-1"></i>
                    <div>
                      <strong>Student Counseling & Inquiries</strong>
                      <div className="small text-secondary">Guide aspiring trainers and explain diploma career outcomes.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-arrow-right text-primary mt-1"></i>
                    <div>
                      <strong>Teaching & Practical Delivery</strong>
                      <div className="small text-secondary">Execute classes using INPTA standardized syllabus and practical standards.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-arrow-right text-primary mt-1"></i>
                    <div>
                      <strong>Local Batch Admissions</strong>
                      <div className="small text-secondary">Enroll students in weekday, weekend, and diploma cohorts.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-arrow-right text-primary mt-1"></i>
                    <div>
                      <strong>Local Operations & Student Care</strong>
                      <div className="small text-secondary">Manage local day-to-day batch schedules, student doubts, and attendance.</div>
                    </div>
                  </li>
                  <li className="role-list-item">
                    <i className="fas fa-arrow-right text-primary mt-1"></i>
                    <div>
                      <strong>Local Marketing Budget (~₹2k/day)</strong>
                      <div className="small text-secondary">Meta/Google ads budget directly deducted from generated revenue.</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-light rounded-3 text-center border">
            <span className="fw-bold text-dark">Outcome:</span> A highly profitable, credible fitness education business running smoothly from day one.
          </div>
        </div>
      </section>

      {/* Marketing Support Funnel */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Marketing Support</span>
            <h2 className="tp-section-title">A Predictable Funnel Built for Admissions</h2>
            <p className="tp-section-desc">
              INPTA provides complete marketing guidance to generate a steady stream of student admissions in your city.
            </p>
          </div>

          <div className="row g-3 text-start">
            {[
              { step: "01", name: "Strategy", desc: "City-level market positioning and optimal course mix planning." },
              { step: "02", name: "Creatives & Branding", desc: "Ready-to-run high-converting design assets, posters, and videos." },
              { step: "03", name: "Social Media", desc: "Content calendars and proven social media playbooks." },
              { step: "04", name: "Campaign Planning", desc: "Targeted localized demographic ad campaigns and budgets." },
              { step: "05", name: "Lead Generation", desc: "High-intent local inquiries generated through digital marketing." },
              { step: "06", name: "Lead Conversion", desc: "Admissions counseling scripts and predictable enrollment funnel." },
            ].map((f, i) => (
              <div className="col-md-4" key={i}>
                <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                  <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">Phase {f.step}</span>
                  <h4 className="fw-bold fs-5">{f.name}</h4>
                  <p className="text-secondary small mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card mt-4 border-0 shadow-sm bg-white p-4 rounded-4 text-start">
            <h5 className="fw-bold text-dark mb-2">
              <i className="fas fa-coins text-warning me-2"></i> Recommended Local Marketing Expense
            </h5>
            <p className="text-secondary mb-2">
              Marketing expenses such as <strong>Meta Ads, Google Ads, and Influencer Marketing</strong>, estimated at around <strong>₹2,000 per day</strong>, will be applicable as required to drive high batch enrollments.
            </p>
            <div className="alert alert-info py-2 mb-0 small">
              <i className="fas fa-info-circle me-1"></i> All such marketing costs are deducted directly from the generated batch revenue for zero partner cash-flow stress.
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Development & Backend Operations */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center text-start">
            <div className="col-lg-6">
              <span className="tp-section-tag">Faculty Development</span>
              <h2 className="tp-section-title">Train-the-Trainer Program</h2>
              <p className="tp-section-desc mb-4">
                Your faculty is certified by INPTA master trainers before your first batch begins — and stays current as the industry evolves.
              </p>

              <div className="row g-3">
                {[
                  { title: "Teaching Skills", desc: "Classroom delivery methods and pacing standards." },
                  { title: "Presentation Skills", desc: "Confident, structured lecture delivery." },
                  { title: "Practical Delivery", desc: "Hands-on gym demonstration standards." },
                  { title: "Student Handling", desc: "Managing doubts, motivation, and discipline." },
                  { title: "Fair Assessment", desc: "Unbiased, consistent practical evaluation." },
                  { title: "Quality Standards", desc: "Maintaining national accreditation benchmarks." },
                ].map((comp, idx) => (
                  <div className="col-sm-6" key={idx}>
                    <div className="p-3 bg-light rounded-3 border">
                      <h5 className="fw-bold fs-6 mb-1 text-primary">
                        <i className="fas fa-check-square me-2 text-success"></i>{comp.title}
                      </h5>
                      <small className="text-secondary">{comp.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <span className="tp-section-tag">Backend Support</span>
              <h2 className="tp-section-title">You Teach. We Run the Systems.</h2>
              <p className="tp-section-desc mb-4">
                A fully managed operations layer eliminates the administrative headache from your local team.
              </p>

              <div className="list-group shadow-sm rounded-4 overflow-hidden border">
                {[
                  { title: "Student Registration Portal", icon: "fa-user-plus" },
                  { title: "Central Invoicing & Billing", icon: "fa-file-invoice-dollar" },
                  { title: "Official Certification Issuance", icon: "fa-certificate" },
                  { title: "Standardized Central Examinations", icon: "fa-edit" },
                  { title: "Student Records & Compliance", icon: "fa-folder-open" },
                  { title: "Periodic Quality & Academic Audits", icon: "fa-tasks" },
                  { title: "Dedicated Partner Support Desk", icon: "fa-headset" },
                ].map((item, idx) => (
                  <div className="list-group-item d-flex align-items-center py-3 px-4" key={idx}>
                    <div className="bg-primary text-white rounded-circle p-2 me-3" style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className={`fas ${item.icon} small`}></i>
                    </div>
                    <span className="fw-semibold text-dark">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans & Investment Protection Model */}
      <section className="py-5 bg-light" id="investment-plans">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Accreditation Investment</span>
            <h2 className="tp-section-title">One Licence. A Lifetime Business Opportunity.</h2>
            <p className="tp-section-desc">
              Transparent, high-ROI license options with protected exclusive city rights and complete business infrastructure included.
            </p>
          </div>

          <div className="row g-4 justify-content-center text-start">
            {/* Plan 1 */}
            <div className="col-md-6 col-lg-5">
              <div className="tp-pricing-card">
                <h3 className="tp-plan-name">1 Year Accreditation Plan</h3>
                <div className="tp-plan-price">₹5,00,000</div>
                <div className="tp-plan-duration">+ Applicable Taxes | 1 Year License Access</div>
                <ul className="tp-plan-features">
                  <li><i className="fas fa-check text-success"></i> <strong>Exclusive City Rights</strong> (Offline Courses)</li>
                  <li><i className="fas fa-check text-success"></i> Complete 6-Month Diploma Curriculum</li>
                  <li><i className="fas fa-check text-success"></i> Train-the-Trainer Faculty Certification</li>
                  <li><i className="fas fa-check text-success"></i> Central Admissions & Exam Portal</li>
                  <li><i className="fas fa-check text-success"></i> 70:30 Profit Sharing Model</li>
                  <li><i className="fas fa-check text-success"></i> Investment Recovery Protection Model</li>
                </ul>
                <a
                  href="#apply-now"
                  onClick={() => setFormData((prev) => ({ ...prev, message: "I am interested in the 1 Year Plan." }))}
                  className="btn btn-outline-primary w-100 py-3 rounded-pill fw-bold"
                >
                  Choose 1 Year Plan
                </a>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="col-md-6 col-lg-5">
              <div className="tp-pricing-card featured">
                <span className="tp-popular-badge">Best Long-Term Value</span>
                <h3 className="tp-plan-name">3 Year Accreditation Plan</h3>
                <div className="tp-plan-price">₹10,00,000</div>
                <div className="tp-plan-duration">+ Applicable Taxes | 3 Years Extended License</div>
                <ul className="tp-plan-features">
                  <li><i className="fas fa-check text-success"></i> <strong>Exclusive City Rights for 3 Full Years</strong></li>
                  <li><i className="fas fa-check text-success"></i> Complete Diploma + Advanced Certifications</li>
                  <li><i className="fas fa-check text-success"></i> Priority Marketing & Lead Pipeline</li>
                  <li><i className="fas fa-check text-success"></i> Multi-Batch Scalability & Sunday Cohorts</li>
                  <li><i className="fas fa-check text-success"></i> 70:30 Profit Sharing on All Batches</li>
                  <li><i className="fas fa-check text-success"></i> Maximum Investment Protection Terms</li>
                </ul>
                <a
                  href="#apply-now"
                  onClick={() => setFormData((prev) => ({ ...prev, message: "I am interested in the 3 Year Plan." }))}
                  className="btn btn-warning w-100 py-3 rounded-pill fw-bold text-dark"
                >
                  Choose 3 Year Plan
                </a>
              </div>
            </div>
          </div>

          {/* Investment Protection Model Banner */}
          <div className="card mt-5 border-0 shadow-sm bg-white p-4 p-md-5 rounded-4 text-start">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <span className="badge bg-success px-3 py-2 rounded-pill mb-2">INVESTMENT PROTECTION MODEL</span>
                <h3 className="fw-bold text-dark">Upfront Initial Investment ➔ On-Target Refund Trigger</h3>
                <p className="text-secondary mb-0">
                  <strong>An investment recovery mechanism — not a speculative gamble.</strong> If the partner achieves the agreed performance and revenue criteria, the initial investment amount can be refunded as per the agreed terms.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <div className="p-3 bg-light rounded-3 text-center border">
                  <div className="text-primary fw-bold fs-5">Protected Territory</div>
                  <small className="text-muted">1 Authorized Centre Per City</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build It Yourself vs INPTA Ready System */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Comparison Matrix</span>
            <h2 className="tp-section-title">Build It Yourself vs INPTA Ready Business System</h2>
            <p className="tp-section-desc">
              Why spend years reinventing the wheel when you can launch a recognized, turnkey academy in weeks?
            </p>
          </div>

          <div className="table-responsive">
            <table className="tp-table-custom">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Parameter</th>
                  <th style={{ width: "37.5%" }}>Building Everything Yourself</th>
                  <th style={{ width: "37.5%" }}>INPTA Ready Business System</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold">Launch Time</td>
                  <td className="text-danger">1 to 2 Years of development</td>
                  <td className="text-success"><i className="fas fa-check-circle me-1"></i> Launch in 2 to 4 Weeks</td>
                </tr>
                <tr>
                  <td className="fw-bold">Cost & Investment</td>
                  <td className="text-danger">Unbudgeted, compounding development costs</td>
                  <td className="text-success"><i className="fas fa-check-circle me-1"></i> One transparent, fixed fee</td>
                </tr>
                <tr>
                  <td className="fw-bold">Curriculum</td>
                  <td className="text-danger">Written from scratch, untested</td>
                  <td className="text-success"><i className="fas fa-check-circle me-1"></i> Complete, validated &amp; research-backed</td>
                </tr>
                <tr>
                  <td className="fw-bold">Brand Authority</td>
                  <td className="text-danger">Unknown, unproven in the market</td>
                  <td className="text-success"><i className="fas fa-check-circle me-1"></i> Established national credibility from Day 1</td>
                </tr>
                <tr>
                  <td className="fw-bold">Technology & Portals</td>
                  <td className="text-danger">Built and maintained at your own cost</td>
                  <td className="text-success"><i className="fas fa-check-circle me-1"></i> Provided and centrally updated by INPTA</td>
                </tr>
                <tr>
                  <td className="fw-bold">Marketing & Ads</td>
                  <td className="text-danger">Costly trial and error</td>
                  <td className="text-success"><i className="fas fa-check-circle me-1"></i> Proven syllabus with high conversion playbooks</td>
                </tr>
                <tr>
                  <td className="fw-bold">Backend Admin</td>
                  <td className="text-danger">Hired, trained, and managed locally</td>
                  <td className="text-success"><i className="fas fa-check-circle me-1"></i> Fully managed central operations layer</td>
                </tr>
                <tr>
                  <td className="fw-bold">Certification Validity</td>
                  <td className="text-danger">Local, doubtful acceptance by employers</td>
                  <td className="text-success"><i className="fas fa-check-circle me-1"></i> Nationally recognized &amp; valued certificate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Growth Roadmap */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Growth Roadmap</span>
            <h2 className="tp-section-title">How a City Partner Scales</h2>
            <p className="tp-section-desc">
              A structured roadmap taking your academy from launch day to becoming the undisputed fitness education leader in your territory.
            </p>
          </div>

          <div className="row g-4 text-start">
            {[
              { num: "1", title: "Launch", desc: "Training center opened, premises branded, and local faculty certified by INPTA." },
              { num: "2", title: "Admissions", desc: "First cohorts enrolled through targeted city lead generation and counselor scripts." },
              { num: "3", title: "Expansion", desc: "Course portfolio widened to include second diplomas, workshops, and corporate sessions." },
              { num: "4", title: "Multiple Batches", desc: "Parallel weekday, weekend, and dedicated Sunday cohorts operating at scale." },
              { num: "5", title: "City Leader", desc: "The top recognized fitness education and trainer qualification academy in your city." },
              { num: "6", title: "Regional Growth", desc: "Opportunity to expand into additional centers, satellite venues, and nearby territories." },
            ].map((step, idx) => (
              <div className="col-md-4 col-sm-6" key={idx}>
                <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary fs-6 me-2 px-3 py-2 rounded-circle">{step.num}</span>
                    <h4 className="fw-bold fs-5 mb-0">{step.title}</h4>
                  </div>
                  <p className="text-secondary small mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead & Application Form */}
      <section className="py-5 bg-white" id="apply-now">
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 text-start">
              <span className="tp-section-tag">Apply for Partnership</span>
              <h2 className="tp-section-title">Become an Authorized INPTA Training Partner</h2>
              <p className="tp-section-desc mb-4">
                Fill out the application below to check city availability and schedule a one-on-one accreditation consultation with our leadership team.
              </p>

              <div className="p-4 bg-light rounded-4 border mb-4">
                <h5 className="fw-bold mb-3"><i className="fas fa-headset text-primary me-2"></i> Direct Partnership Desk</h5>
                <p className="mb-2">
                  <strong>Phone:</strong> <a href="tel:+918866842520" className="text-primary">+91 8866842520</a>
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> <a href="mailto:connect@inptafoundation.com" className="text-primary">connect@inptafoundation.com</a>
                </p>
                <p className="mb-0">
                  <strong>Website:</strong> <a href="https://www.inpta.in" target="_blank" rel="noreferrer" className="text-primary">www.inpta.in</a>
                </p>
              </div>

              <div className="d-flex gap-3">
                <Link to="/registration" className="btn btn-outline-primary px-4 py-2 rounded-pill fw-bold">
                  <i className="fas fa-clipboard-list me-2"></i> Start Online Registration
                </Link>
                <Link to="/training-center-program" className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-bold">
                  <i className="fas fa-calculator me-2"></i> View TC Economics
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 bg-white text-start">
                <h4 className="fw-bold mb-3">Partner Application Form</h4>
                <p className="text-muted small mb-4">
                  Check if your city territory is currently available for exclusive INPTA accreditation.
                </p>

                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Full Name *</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control rounded-3"
                        name="phone"
                        placeholder="Mobile number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Email Address</label>
                      <input
                        type="email"
                        className="form-control rounded-3"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Target City *</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        name="city"
                        placeholder="e.g. Ahmedabad, Pune"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Your Background</label>
                      <select
                        className="form-select rounded-3"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                      >
                        <option value="Gym Owner / Fitness Professional">Gym Owner / Coach</option>
                        <option value="Education Institution / Academy">Education Institution</option>
                        <option value="Entrepreneur / Investor">Entrepreneur / Investor</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold">Message or Questions</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      name="message"
                      placeholder="Tell us about your facility or timeline..."
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold">
                    <i className="fab fa-whatsapp me-2"></i> Submit Application via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default TrainingPartnerPage;
