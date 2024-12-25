import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";

const ReturnPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="page-wrapper return-policy-page">
      {" "}
      <Helmet>
        <title>{t("Return Policy - HulaHop")}</title>
      </Helmet>
      <div className="container">
        <div className="title mb-4">{t("Return of Goods and Complaints")}</div>
        <div className="description mb-3">
          {t(
            "When picking up the package, please visually check your package in the presence of the courier, or in the premises of the courier service if you are picking up the package there. If there are visible damages on it (torn parts, open package), you should not take the package. In this case, please send us an e-mail with your data (name, surname, phone) to the address info@hulahop.shop and state the reason for which you refused to collect the package or call us at +381 63 118 28 78. We will inform you about further action as soon as possible."
          )}
        </div>
        <div className="description mb-3">
          {t(
            "If you received the shipment and after opening the box found that the delivered goods do not correspond to the ordered ones or the information on the invoice is not correct, please contact us, no later than 24 hours from the moment of receipt of the shipment, by sending us an e-mail with your information ( first name, last name, phone) to the address info@hulahop.shop and describe what kind of problem you have or call us at +381 63 118 28 78. We will inform you about further action as soon as possible, in writing or electronically. The deadline for resolving the complaint is 15 days from the moment of reporting it. Of course, we will do our best to resolve your complaint in a much shorter time."
          )}
        </div>
        <div className="description mb-3">
          {t(
            "If the product is correct but the consumer wants, for some reason, to cancel the contract and return the product, he can do so within 14 days from the moment when it was delivered to him. In that case, the consumer has the right to a refund in the amount of the purchase price paid for the goods in question, but the costs of returning the purchased goods are borne directly by the buyer."
          )}
        </div>
        <div className="description mb-3">
          {t(
            "The consumer has no right to complain if the defect in the product was caused by his fault, if the product has physical and chemical damage caused by use or improper maintenance of the product."
          )}
        </div>

        <div className="description mb-3">
          {t(
            "By confirming the order, you agree to the terms of the complaint."
          )}
        </div>
        <div className="description mb-3">
          {t(
            "If you bought goods through the HULAHOP internet platform and you have remarks, complaints, objections, etc., you can contact us at any time at the e-mail address: info@hulahop.shop"
          )}
        </div>
        <div className="description mb-3">
          {t(
            "In the event of withdrawal from the contract, the consumer has the right to a refund or exchange for another product from the same category with the same print (for textile products, another size in the same color). The amount is returned to the customer upon receipt of the product, and after it is determined that the product is returned undamaged and correct."
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
