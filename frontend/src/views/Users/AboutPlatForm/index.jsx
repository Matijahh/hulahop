import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTE_SIGN_UP } from "../../../routes/routes";

import ButtonComponent from "../../../components/ButtonComponent/index";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Helmet } from "react-helmet";

import HeroImage from "../../../assets/images/about-platform-hero.png";
import ProsImage from "../../../assets/images/pros-illustration.png";
import Step1 from "../../../assets/images/step1.png";
import Step2 from "../../../assets/images/step4.png";
import Step3 from "../../../assets/images/step6.png";

const AboutPlatForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="page-wrapper about-platform-page">
        <Helmet>
          <title>{t("About Platform - HulaHop")}</title>
        </Helmet>
        <div className="about-hero-section">
          <div className="container">
            <div className="about-hero-info">
              <h2>{t("Welcome to the first serbian POD platform HULAHOP")}</h2>
              <p>
                {t(
                  "Create, sell and order personalized products in easy way, with our support."
                )}
              </p>
              <ButtonComponent
                onClick={() => navigate(ROUTE_SIGN_UP)}
                text={t("Become Seller")}
                variant="contained"
              />
            </div>
            <div className="about-hero-img">
              <img src={HeroImage} alt="" />
            </div>
          </div>
        </div>
        <div className="who-we-are-section">
          <div className="container">
            <h2 className="title">{t("Who we are?")}</h2>
            <div className="video-info-container">
              <div className="video-container">
                <iframe
                  width="620"
                  height="360"
                  src="https://www.youtube.com/embed/PgniL3fILmM?si=qcqCY5kBg7g3lMUD"
                  title={t("YouTube Video Player")}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="info-container">
                <p>
                  {t(
                    "HULAHOP is the first Serbian Print on Demand platform. Our mission is to provide a simple and practical solution for everyone who wants to design, order, or sell personalized products – without initial investments or logistical concerns."
                  )}
                </p>
                <p>
                  {t(
                    "On our platform, you can find a wide range of high-quality products and choose printing techniques that best suit your needs. We believe in the power of creativity and aim to support it every step of the way on your business journey."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mission-vision-section">
          <div className="mission-vision-container container">
            <p>
              {t(
                "Our mission is to support all creatives, entrepreneurs, and personalized product enthusiasts in bringing their ideas to life and starting their own business – without risk or initial investments."
              )}
            </p>
            <p>
              {t(
                "Our vision is for HULAHOP to become synonymous with quality, reliability, and innovation in the field of personalized products in Serbia and the region."
              )}
            </p>
          </div>
        </div>
        <div className="steps-section">
          <div className="container">
            <h2>{t("How Does It Work?")}</h2>
            <div className="steps-container">
              <div className="images-container">
                <img src={Step1} alt="" />
                <img src={Step2} alt="" />
                <img src={Step3} alt="" />
              </div>
              <div className="numbers-container">
                <span className="num">1</span>
                <span className="line"></span>
                <span className="num">2</span>
                <span className="line"></span>
                <span className="num">3</span>
              </div>
              <div className="paragraphs-container">
                <div className="p-container">
                  <h4>{t("Create an account")}</h4>
                  <p>
                    {t(
                      "Create your account quickly and easily and open your personalized online store."
                    )}
                  </p>
                </div>
                <div className="p-container">
                  <h4>{t("Add design")}</h4>
                  <p>
                    {t(
                      "Be creative and upload your design on one of our many products."
                    )}
                  </p>
                </div>
                <div className="p-container">
                  <h4>{t("We take care of everything")}</h4>
                  <p>
                    {t(
                      "After each order, we produce and ship the product directly to the customer; your job is just to promote the products."
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="steps-container-mobile">
              <div className="step-container">
                <img src={Step1} alt="" />
                <span className="num">1</span>
                <div className="p-container">
                  <h4>{t("Create an account")}</h4>
                  <p>
                    {t(
                      "Create your account quickly and easily and open your personalized online store."
                    )}
                  </p>
                </div>
              </div>
              <div className="step-container">
                <img src={Step2} alt="" />
                <span className="num">2</span>
                <div className="p-container">
                  <h4>{t("Add design")}</h4>
                  <p>
                    {t(
                      "Be creative and upload your design on one of our many products."
                    )}
                  </p>
                </div>
              </div>
              <div className="step-container">
                <img src={Step3} alt="" />
                <span className="num">3</span>
                <div className="p-container">
                  <h4>{t("We take care of everything")}</h4>
                  <p>
                    {t(
                      "After each order, we produce and ship the product directly to the customer; your job is just to promote the products."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pros-section">
          <div className="pros-container container">
            <div className="info-container">
              <h2>{t("Pros of our Platform")}</h2>
              <ul>
                <li>
                  <TaskAltIcon />
                  <span>{t("Free registration and store setup")}</span>
                </li>
                <li>
                  <TaskAltIcon />
                  <span>{t("A wide range of premium-quality products")}</span>
                </li>
                <li>
                  <TaskAltIcon />
                  <span>
                    {t("Various printing techniques tailored to your needs")}
                  </span>
                </li>
                <li>
                  <TaskAltIcon />
                  <span>
                    {t(
                      "Complete logistical support – from production to delivery"
                    )}
                  </span>
                </li>
                <li>
                  <TaskAltIcon />
                  <span>
                    {t(
                      "A tailored platform for creatives of all experience levels"
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className="img-container">
              <img src={ProsImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPlatForm;
