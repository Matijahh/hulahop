import { useTranslation } from "react-i18next";

import SliderComponent from "../../../components/SliderComponent/SliderComponent";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderSection = () => {
  const { t } = useTranslation();

  return (
    <SliderComponent arrows={true} centerMode={true} centerPadding={0}>
      <div className="home-slide-wrapper">
        <div className="home-slide-box">
          <h4>{t("The first step is registration")}</h4>
          <p>
            {t(
              "Register and open your store according to the instructions: 'How to register as a seller'"
            )}
          </p>
        </div>
      </div>
      <div className="home-slide-wrapper">
        <div className="home-slide-box">
          <h4>{t("The second step is to set up the store")}</h4>
          <p>
            {t(
              "Customize your store to your needs and taste, according to the instructions: 'How to set up a store'"
            )}
          </p>
        </div>
      </div>
      <div className="home-slide-wrapper">
        <div className="home-slide-box">
          <h4>
            {t("The third step is the selection of articles and their design")}
          </h4>
          <p>
            {t(
              "Select and place the items from our offer in your store, according to the instructions: 'How to add items to the store'"
            )}
          </p>
        </div>
      </div>
      <div className="home-slide-wrapper">
        <div className="home-slide-box">
          <h4>{t("Do your best to offer your customers")}</h4>
          <p>
            {t(
              "More details in the instructions: 'How to buy', and in short like this: Your customers choose what to order in your online store,click to order the desired article, enter the data for sending."
            )}
          </p>
        </div>
      </div>
      <div className="home-slide-wrapper">
        <div className="home-slide-box">
          <h4>{t("We are processing the order")}</h4>
          <p>
            {t(
              "The order arrives at our place for processing, after confirmation of the order by e-mail or phone, we print and pack the product, deliver it to the customer by a courier service with which we have a contract."
            )}
          </p>
        </div>
      </div>
      <div className="home-slide-wrapper">
        <div className="home-slide-box">
          <h4>{t("Process Completed")}</h4>
          <p>
            {t(
              "Upon receipt, the customer pays for the order with postal costs, the service pays us the money, we transfer your part of the payment to you."
            )}
          </p>
        </div>
      </div>
    </SliderComponent>
  );
};

export default SliderSection;
