import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/partner-program.css";

const TrainingCenterPage = () => {
  // Profit Calculator State
  const [studentCount, setStudentCount] = useState(50);
  const [courseFee, setCourseFee] = useState(42000);
  const [operationalCostPercent, setOperationalCostPercent] = useState(18); // 15-20%

  // Calculator Computations
  const totalRevenue = studentCount * courseFee;
  const operationalCostAmount = (totalRevenue * operationalCostPercent) / 100;
  const netRevenue = totalRevenue - operationalCostAmount;
  const partnerShare = (netRevenue * 70) / 100;
  const inptaShare = (netRevenue * 30) / 100;

  // Student Demographics Data from Slide 5
  const cityDistribution = [
    { city: "Surat", pct: "11.50%", count: "2,070+", color: "bg-primary" },
    { city: "Delhi NCR", pct: "6.00%", count: "1,080+", color: "bg-info" },
    { city: "Mumbai", pct: "4.00%", count: "720+", color: "bg-warning" },
    { city: "Bangalore", pct: "2.50%", count: "450+", color: "bg-success" },
    { city: "Pune", pct: "2.50%", count: "450+", color: "bg-success" },
    { city: "Ahmedabad", pct: "2.00%", count: "360+", color: "bg-primary" },
    { city: "Hyderabad", pct: "2.00%", count: "360+", color: "bg-primary" },
    { city: "Vadodara", pct: "1.50%", count: "270+", color: "bg-secondary" },
    { city: "Kolkata", pct: "1.20%", count: "216+", color: "bg-secondary" },
    { city: "Patna", pct: "1.20%", count: "216+", color: "bg-secondary" },
    { city: "Indore", pct: "1.00%", count: "180+", color: "bg-secondary" },
    { city: "Bharuch", pct: "1.00%", count: "180+", color: "bg-secondary" },
    { city: "Nagpur", pct: "1.00%", count: "180+", color: "bg-secondary" },
    { city: "Rajkot", pct: "0.80%", count: "144+", color: "bg-dark" },
    { city: "Jaipur", pct: "0.80%", count: "144+", color: "bg-dark" },
    { city: "Vapi / Valsad", pct: "0.70%", count: "126+", color: "bg-dark" },
    { city: "Navsari", pct: "0.60%", count: "108+", color: "bg-dark" },
    { city: "Bhopal", pct: "0.50%", count: "90+", color: "bg-dark" },
    { city: "Lucknow", pct: "0.50%", count: "90+", color: "bg-dark" },
    { city: "Other Indian Cities", pct: "58.00%", count: "10,440+", color: "bg-primary" },
  ];

  // Inquiry Form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gymName: "",
    city: "",
    gymArea: "",
    message: "",
  });

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

    const textMessage = `Hello INPTA Team,%0A%0AI want to register as an Authorized INPTA Training Center (TC).%0A%0A*Name:* ${encodeURIComponent(
      formData.name
    )}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Gym/Facility:* ${encodeURIComponent(
      formData.gymName || "N/A"
    )}%0A*City:* ${encodeURIComponent(formData.city)}%0A*Facility Area:* ${encodeURIComponent(
      formData.gymArea || "N/A"
    )}%0A*Message:* ${encodeURIComponent(formData.message || "Requesting TC Verification")}`;

    window.open(`https://api.whatsapp.com/send?phone=918866842520&text=${textMessage}`, "_blank");
    toast.success("Thank you! Opening WhatsApp to connect with the Training Center desk...");
  };

  return (
    <div className="partner-page-wrapper">
      <Helmet>
        <title>Training Center (TC) | Authorized INPTA Training Center Accreditation</title>
        <meta
          name="description"
          content="One City. One Authorized INPTA Training Center. Launch 6-month diploma fitness courses with 70:30 profit sharing, standardized curriculum, and 100% job placement."
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
                <i className="fas fa-dumbbell me-2"></i> AUTHORIZED INPTA TRAINING CENTER
              </span>
              <h1 className="tp-hero-title">
                “One City. One Authorized <span>INPTA Training Center.</span>”
              </h1>
              <p className="tp-hero-subtitle">
                Launch professional diploma programs, build a steady stream of certified trainers, and
                earn <strong>70% profit share</strong> with complete central curriculum, marketing, and backend support.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#profit-calculator" className="btn btn-warning btn-lg px-4 py-3 fw-bold rounded-pill text-dark">
                  <i className="fas fa-calculator me-2"></i> Calculate Batch Profit
                </a>
                <Link to="/training-partner-program" className="btn btn-outline-light btn-lg px-4 py-3 fw-bold rounded-pill">
                  <i className="fas fa-handshake me-2"></i> Training Partner Program
                </Link>
                <Link to="/training-center" className="btn btn-primary btn-lg px-4 py-3 fw-bold rounded-pill">
                  <i className="fas fa-file-signature me-2"></i> TC Verification Form
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="row g-3">
                <div className="col-6">
                  <div className="tp-stat-pill">
                    <span className="tp-stat-number">₹42,000</span>
                    <span className="tp-stat-label">Avg Fee Per Student</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="tp-stat-pill">
                    <span className="tp-stat-number">70%</span>
                    <span className="tp-stat-label">Partner Profit Share</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="tp-stat-pill">
                    <span className="tp-stat-number">10 - 50</span>
                    <span className="tp-stat-label">Students Per Batch</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="tp-stat-pill">
                    <span className="tp-stat-number">100%</span>
                    <span className="tp-stat-label">Job Placement Record</span>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-lg mt-4 bg-white text-dark rounded-4 p-4 text-start">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-success px-3 py-2 rounded-pill me-2">ALREADY UNDERWAY</span>
                  <span className="text-muted small fw-bold">Not Just a Future Plan</span>
                </div>
                <p className="text-secondary small mb-0">
                  We are actively onboarding Training Centers across Indian cities and placing graduating students into top gyms and wellness centers nationwide today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Batch Profit Calculator Section */}
      <section className="py-5 bg-white" id="profit-calculator">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Financial Potential</span>
            <h2 className="tp-section-title">Interactive Batch Profit &amp; Revenue Calculator</h2>
            <p className="tp-section-desc">
              See how batch size and student admissions translate into immediate revenue and a 70% partner profit surplus.
            </p>
          </div>

          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7">
              <div className="tp-calc-box text-start">
                <h4 className="fw-bold mb-4 text-dark">
                  <i className="fas fa-sliders-h text-primary me-2"></i> Configure Batch Parameters
                </h4>

                {/* Slider 1: Students */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="fw-bold text-dark">Students Enrolled per Batch:</label>
                    <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
                      {studentCount} Students
                    </span>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    min="10"
                    max="100"
                    step="5"
                    value={studentCount}
                    onChange={(e) => setStudentCount(Number(e.target.value))}
                  />
                  <div className="d-flex justify-content-between text-muted small">
                    <span>10 (Min Batch)</span>
                    <span>25 (Mid Batch)</span>
                    <span>50 (Full Capacity)</span>
                    <span>100 (2 Full Batches)</span>
                  </div>
                </div>

                {/* Slider 2: Course Fee */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="fw-bold text-dark">Average Course Fee per Student:</label>
                    <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                      ₹{courseFee.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    min="30000"
                    max="60000"
                    step="2000"
                    value={courseFee}
                    onChange={(e) => setCourseFee(Number(e.target.value))}
                  />
                  <div className="d-flex justify-content-between text-muted small">
                    <span>₹30,000</span>
                    <span>₹42,000 (Standard)</span>
                    <span>₹60,000</span>
                  </div>
                </div>

                {/* Operational Cost percentage */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="fw-bold text-dark">Estimated Operational &amp; Material Costs:</label>
                    <span className="badge bg-secondary fs-6 px-3 py-2 rounded-pill">
                      {operationalCostPercent}% (~₹{Math.round(operationalCostAmount).toLocaleString("en-IN")})
                    </span>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    min="15"
                    max="25"
                    step="1"
                    value={operationalCostPercent}
                    onChange={(e) => setOperationalCostPercent(Number(e.target.value))}
                  />
                  <small className="text-muted">
                    Includes TC rent allocation, faculty fees (if applicable), marketing, and student study material printing.
                  </small>
                </div>

                <div className="p-3 bg-light rounded-3 border mt-4 small">
                  <i className="fas fa-info-circle text-primary me-2"></i>
                  <strong>Revenue Sharing Formula:</strong> 100% Student Fee Collection ➔ Minus 15-20% Direct Course Costs ➔ Net Surplus shared as <strong>70% Partner : 30% INPTA</strong>.
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="tp-calc-result-card text-start">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-white fw-bold mb-0">Batch Profit Breakdown</h5>
                    <span className="badge bg-warning text-dark fw-bold">70 : 30 Split</span>
                  </div>

                  <div className="tp-result-item">
                    <span className="text-white-50">Total Gross Revenue</span>
                    <strong className="text-white fs-5">₹{totalRevenue.toLocaleString("en-IN")}</strong>
                  </div>

                  <div className="tp-result-item">
                    <span className="text-white-50">Less Operational Costs ({operationalCostPercent}%)</span>
                    <strong className="text-danger">- ₹{Math.round(operationalCostAmount).toLocaleString("en-IN")}</strong>
                  </div>

                  <div className="tp-result-item">
                    <span className="text-white-50">Net Operating Surplus</span>
                    <strong className="text-info fs-5">₹{Math.round(netRevenue).toLocaleString("en-IN")}</strong>
                  </div>

                  <div className="tp-result-highlight">
                    <div className="small text-warning fw-bold text-uppercase mb-1">YOUR 70% PARTNER SHARE</div>
                    <div className="fs-2 fw-bold text-white">₹{Math.round(partnerShare).toLocaleString("en-IN")}</div>
                    <small className="text-white-50">Per completed batch cohort</small>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="d-flex justify-content-between text-white-50 small mb-3">
                    <span>INPTA Central Share (30%):</span>
                    <span>₹{Math.round(inptaShare).toLocaleString("en-IN")}</span>
                  </div>
                  <a href="#apply-tc" className="btn btn-warning w-100 py-3 rounded-pill fw-bold text-dark">
                    <i className="fas fa-check-circle me-2"></i> Apply for TC Accreditation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Profit Scenario - Step by Step from Slide 28 */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Case Study</span>
            <h2 className="tp-section-title">One Full Batch, Step by Step</h2>
            <p className="tp-section-desc">
              Illustrative financial roadmap for a single full capacity cohort of 50 diploma students.
            </p>
          </div>

          <div className="row g-3 text-start">
            <div className="col-md-3">
              <div className="p-4 bg-white rounded-4 border text-center shadow-sm h-100">
                <span className="text-muted small text-uppercase fw-bold">Step 1: Enrollment</span>
                <h4 className="fw-bold fs-4 my-2 text-dark">50 Students</h4>
                <p className="small text-secondary mb-0">@ ₹42,000 average course fee</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-4 bg-white rounded-4 border text-center shadow-sm h-100">
                <span className="text-muted small text-uppercase fw-bold">Step 2: Gross Fees</span>
                <h4 className="fw-bold fs-4 my-2 text-primary">₹21,00,000</h4>
                <p className="small text-secondary mb-0">Total collected student fees</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-4 bg-white rounded-4 border text-center shadow-sm h-100">
                <span className="text-muted small text-uppercase fw-bold">Step 3: Direct Costs</span>
                <h4 className="fw-bold fs-4 my-2 text-danger">Less Costs</h4>
                <p className="small text-secondary mb-0">TC rent, faculty, material &amp; ads</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-4 bg-primary text-white rounded-4 border text-center shadow-sm h-100">
                <span className="text-white-50 small text-uppercase fw-bold">Step 4: Revenue Split</span>
                <h4 className="fw-bold fs-4 my-2 text-warning">70% Partner Share</h4>
                <p className="small text-white-50 mb-0">Shared quarterly per batch</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-3 border text-center mt-4 small text-muted">
            <em>Illustrative example only — costs, shares, and final commercial terms are subject to the formal partnership agreement.</em>
          </div>
        </div>
      </section>

      {/* Batch Size & Revenue Potential Table (Slide 22) */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Scalability Index</span>
            <h2 className="tp-section-title">Batch Size Drives Batch Revenue</h2>
            <p className="tp-section-desc">
              Whether you start with a minimum cohort or run multiple full-capacity classes simultaneously, your revenue scales linearly.
            </p>
          </div>

          <div className="table-responsive">
            <table className="tp-table-custom">
              <thead>
                <tr>
                  <th>Batch Tier</th>
                  <th>Student Enrollment</th>
                  <th>Revenue Index</th>
                  <th>Est. Gross Revenue (@ ₹42k)</th>
                  <th>Cohort Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold">Minimum Batch</td>
                  <td>10 Students</td>
                  <td>20%</td>
                  <td>₹4,20,000</td>
                  <td><span className="badge bg-secondary">Launch Tier</span></td>
                </tr>
                <tr>
                  <td className="fw-bold">Growing Batch</td>
                  <td>15 Students</td>
                  <td>30%</td>
                  <td>₹6,30,000</td>
                  <td><span className="badge bg-info text-dark">Expanding</span></td>
                </tr>
                <tr>
                  <td className="fw-bold">Standard Batch</td>
                  <td>20 Students</td>
                  <td>40%</td>
                  <td>₹8,40,000</td>
                  <td><span className="badge bg-primary">Standard Size</span></td>
                </tr>
                <tr>
                  <td className="fw-bold">Mid-Size Batch</td>
                  <td>25 Students</td>
                  <td>50%</td>
                  <td>₹10,50,000</td>
                  <td><span className="badge bg-primary">Profitable</span></td>
                </tr>
                <tr>
                  <td className="fw-bold">Strong Batch</td>
                  <td>30 Students</td>
                  <td>60%</td>
                  <td>₹12,60,000</td>
                  <td><span className="badge bg-success">High Margin</span></td>
                </tr>
                <tr>
                  <td className="fw-bold">Large Batch</td>
                  <td>40 Students</td>
                  <td>80%</td>
                  <td>₹16,80,000</td>
                  <td><span className="badge bg-success">Accelerated</span></td>
                </tr>
                <tr>
                  <td className="fw-bold">Full Capacity Batch</td>
                  <td>50 Students</td>
                  <td>100%</td>
                  <td>₹21,00,000</td>
                  <td><span className="badge bg-warning text-dark">Target Capacity</span></td>
                </tr>
                <tr>
                  <td className="fw-bold">Two Full Batches</td>
                  <td>100 Students</td>
                  <td>200%</td>
                  <td>₹42,00,000</td>
                  <td><span className="badge bg-danger">Multi-Batch Powerhouse</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Academic System: From Curriculum to Certification (Slide 11) */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Academic Quality</span>
            <h2 className="tp-section-title">From Curriculum to Certification</h2>
            <p className="tp-section-desc">
              A comprehensive 7-stage learning and assessment pipeline delivering real fitness competence.
            </p>
          </div>

          <div className="row g-2 text-start mb-5">
            {[
              { step: "1", title: "Curriculum", icon: "fa-book-open" },
              { step: "2", title: "Books", icon: "fa-book" },
              { step: "3", title: "PPTs", icon: "fa-chalkboard-teacher" },
              { step: "4", title: "Assignments", icon: "fa-tasks" },
              { step: "5", title: "Practicals", icon: "fa-dumbbell" },
              { step: "6", title: "Assessment", icon: "fa-clipboard-check" },
              { step: "7", title: "Certification", icon: "fa-award" },
            ].map((st, i) => (
              <div className="col" key={i} style={{ minWidth: "130px" }}>
                <div className="p-3 bg-white rounded-3 border text-center shadow-sm">
                  <div className="text-primary mb-2">
                    <i className={`fas ${st.icon} fa-lg`}></i>
                  </div>
                  <strong className="d-block text-dark small">{st.title}</strong>
                  <span className="badge bg-light text-secondary border mt-1">Step {st.step}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4 text-start">
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-primary px-3 py-2 rounded-pill me-2">STRUCTURED</span>
                </div>
                <h4 className="fw-bold fs-5 text-dark">Outcome Mapped</h4>
                <p className="text-secondary small mb-0">
                  Every single module is sequenced, timed, and precisely mapped to professional fitness outcomes.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-warning text-dark px-3 py-2 rounded-pill me-2">PRACTICAL-LED</span>
                </div>
                <h4 className="fw-bold fs-5 text-dark">Gym Floor Demonstration</h4>
                <p className="text-secondary small mb-0">
                  Rigorous classroom theory is strictly paired with supervised gym-floor practical delivery and cueing.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-success px-3 py-2 rounded-pill me-2">AUDITED</span>
                </div>
                <h4 className="fw-bold fs-5 text-dark">National Benchmarks</h4>
                <p className="text-secondary small mb-0">
                  Assessment and certification stay centrally audited with INPTA for total consistency nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready Courses & Batch Structure (Slide 20) */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Course &amp; Batch Formats</span>
            <h2 className="tp-section-title">Ready Courses. Ready Batches.</h2>
            <p className="tp-section-desc">
              Flexible scheduling models tailored for college students, full-time career switchers, and working professionals.
            </p>
          </div>

          <div className="row g-4 text-start">
            {[
              {
                title: "6-Month Diploma Course",
                desc: "Complete flagship course content and batch structure provided by INPTA central academics.",
                icon: "fa-graduation-cap",
              },
              {
                title: "Second Diploma Program",
                desc: "A second 6-month specialization track (e.g. Clinical Nutrition, Strength & Conditioning) to widen enrollment.",
                icon: "fa-certificate",
              },
              {
                title: "Weekend Batch Format",
                desc: "Saturday & Sunday lecture and practical delivery suited for working corporate individuals.",
                icon: "fa-calendar-alt",
              },
              {
                title: "Weekday Batch Format",
                desc: "Monday to Friday/Saturday fast-track batches for full-time learners and aspiring trainers.",
                icon: "fa-clock",
              },
              {
                title: "Dedicated Sunday Format",
                desc: "Sunday-only cohorts to capture high-intent students where local work schedules demand it.",
                icon: "fa-calendar-check",
              },
              {
                title: "Multiple Parallel Batches",
                desc: "Run parallel morning and evening batches without extra fixed costs as student inquiries scale.",
                icon: "fa-layer-group",
              },
            ].map((b, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="tp-card">
                  <div className="tp-card-icon">
                    <i className={`fas ${b.icon}`}></i>
                  </div>
                  <h4 className="tp-card-title">{b.title}</h4>
                  <p className="tp-card-desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multiple Revenue Streams (Slide 17) */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Monetization Channels</span>
            <h2 className="tp-section-title">Multiple Income Streams Under One Roof</h2>
            <p className="tp-section-desc">
              Each income stream utilizes the same facility premises, faculty, and brand authority — compounding your revenues without increasing fixed overheads.
            </p>
          </div>

          <div className="row g-3 text-start justify-content-center">
            {[
              { name: "Diploma Programs", desc: "Flagship 6-month personal training and nutritionist diplomas." },
              { name: "Specialized Short Courses", desc: "Functional training, HIIT, kettlebell, and injury prevention." },
              { name: "Offline Webinars & Seminars", desc: "Local fitness community events and guest lectures." },
              { name: "Hands-on Workshops", desc: "Weekend workshops for biomechanics and CPR/First Aid." },
              { name: "Corporate Fitness Training", desc: "Workplace ergonomics and fitness programs for local companies." },
              { name: "Faculty Masterclasses", desc: "Advanced strength programming by master educators." },
              { name: "Advanced Certifications", desc: "High-ticket master trainer and sports nutrition credentials." },
            ].map((stream, idx) => (
              <div className="col-md-4 col-sm-6" key={idx}>
                <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                  <div className="text-warning mb-2">
                    <i className="fas fa-coins fa-lg"></i>
                  </div>
                  <h4 className="fw-bold fs-6 mb-1 text-dark">{stream.name}</h4>
                  <p className="text-secondary small mb-0">{stream.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* National Student Data & Distribution (Slide 5) */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">National Student Footprint</span>
            <h2 className="tp-section-title">18,000+ Students Nationwide</h2>
            <p className="tp-section-desc">
              Proven student demand across all major Indian metropolitan and tier-2/3 cities.
            </p>
          </div>

          <div className="row g-3">
            {cityDistribution.map((item, idx) => (
              <div className="col-6 col-md-4 col-lg-3" key={idx}>
                <div className="city-badge-item">
                  <span className="city-name">{item.city}</span>
                  <span className="city-count">{item.pct}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-4 bg-light border text-center">
            <h5 className="fw-bold text-dark mb-1">Total Enrolled &amp; Certified Students: 18,000+</h5>
            <p className="text-secondary small mb-0">
              Surat (2,070+), Delhi NCR (1,080+), Mumbai (720+), Bangalore &amp; Pune (450+ each), Ahmedabad (360+), and growing rapidly in 100+ cities.
            </p>
          </div>
        </div>
      </section>

      {/* 100% Job Placement Record & 3 Ways to Earn (Slides 6 & 7) */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row g-5 align-items-center text-start">
            <div className="col-lg-6">
              <span className="tp-section-tag">Student Outcomes</span>
              <h2 className="tp-section-title">100% Job Placement for Graduating Students</h2>
              <p className="tp-section-desc mb-4">
                Every graduating student from an authorized INPTA training center gets direct placement assistance through our national network of hiring gym chains, fitness studios, and athletic clubs.
              </p>

              <div className="row g-3">
                <div className="col-12">
                  <div className="p-3 bg-white rounded-3 border d-flex align-items-center">
                    <span className="badge bg-success fs-5 p-3 rounded-circle me-3">
                      <i className="fas fa-briefcase"></i>
                    </span>
                    <div>
                      <h5 className="fw-bold mb-1">1. Full-Time Gym Placement</h5>
                      <small className="text-muted">Hired by leading gym chains, studios, and health resorts.</small>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="p-3 bg-white rounded-3 border d-flex align-items-center">
                    <span className="badge bg-primary fs-5 p-3 rounded-circle me-3">
                      <i className="fas fa-user-ninja"></i>
                    </span>
                    <div>
                      <h5 className="fw-bold mb-1">2. Freelance &amp; Online Coaching</h5>
                      <small className="text-muted">Trained to acquire high-paying independent client rosters.</small>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="p-3 bg-white rounded-3 border d-flex align-items-center">
                    <span className="badge bg-warning text-dark fs-5 p-3 rounded-circle me-3">
                      <i className="fas fa-store-alt"></i>
                    </span>
                    <div>
                      <h5 className="fw-bold mb-1">3. Start Their Own Fitness Business</h5>
                      <small className="text-muted">Equipped with client management and studio setup knowledge.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 bg-primary text-white">
                <h3 className="fw-bold mb-3">Why Students Choose INPTA</h3>
                <ul className="list-unstyled mb-4">
                  <li className="mb-3 d-flex align-items-start">
                    <i className="fas fa-check-circle text-warning fs-5 me-3 mt-1"></i>
                    <div>
                      <strong>Research-Backed Textbooks</strong>
                      <div className="text-white-50 small">Deep sports science research — not recycled local notes.</div>
                    </div>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <i className="fas fa-check-circle text-warning fs-5 me-3 mt-1"></i>
                    <div>
                      <strong>Industry Aligned Syllabus</strong>
                      <div className="text-white-50 small">Practical workout planning, biomechanics, and nutrition protocols.</div>
                    </div>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <i className="fas fa-check-circle text-warning fs-5 me-3 mt-1"></i>
                    <div>
                      <strong>All Fitness Courses on One Platform</strong>
                      <div className="text-white-50 small">Personal trainer, sports nutrition, CPR, and advanced specializations.</div>
                    </div>
                  </li>
                  <li className="d-flex align-items-start">
                    <i className="fas fa-check-circle text-warning fs-5 me-3 mt-1"></i>
                    <div>
                      <strong>18,000+ Alumni Network</strong>
                      <div className="text-white-50 small">Trusted nationwide by gym owners and employers.</div>
                    </div>
                  </li>
                </ul>

                <Link to="/registration" className="btn btn-warning py-3 rounded-pill fw-bold text-dark w-100">
                  Register Your Center Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Center Application & Verification Form (Slide 29) */}
      <section className="py-5 bg-white" id="apply-tc">
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 text-start">
              <span className="tp-section-tag">Get Accredited</span>
              <h2 className="tp-section-title">Apply to Become an Authorized Training Center</h2>
              <p className="tp-section-desc mb-4">
                Bring official INPTA fitness and nutrition diploma programs to your gym or fitness studio. Protect your territory today.
              </p>

              <div className="p-4 bg-light rounded-4 border mb-4">
                <h5 className="fw-bold mb-3">
                  <i className="fas fa-phone-alt text-primary me-2"></i> Official Contact Desk
                </h5>
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
                <Link to="/training-partner-program" className="btn btn-outline-primary px-4 py-2 rounded-pill fw-bold">
                  <i className="fas fa-handshake me-2"></i> View Partner Program
                </Link>
                <Link to="/training-center" className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-bold">
                  <i className="fas fa-tasks me-2"></i> Start TC Verification
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 bg-white text-start">
                <h4 className="fw-bold mb-3">Training Center Inquiry</h4>
                <p className="text-muted small mb-4">
                  Submit your facility details for auditor review and city accreditation availability.
                </p>

                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Contact Name *</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      name="name"
                      placeholder="Your full name"
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
                      <label className="form-label small fw-bold">Gym / Facility Name</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        name="gymName"
                        placeholder="e.g. FitPro Club"
                        value={formData.gymName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">City / Location *</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        name="city"
                        placeholder="e.g. Surat, Mumbai"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Facility Carpet Area</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        name="gymArea"
                        placeholder="e.g. 2,500 sq.ft"
                        value={formData.gymArea}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold">Additional Comments</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      name="message"
                      placeholder="Tell us about existing training rooms or batch readiness..."
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold">
                    <i className="fab fa-whatsapp me-2"></i> Submit Center Application via WhatsApp
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

export default TrainingCenterPage;
