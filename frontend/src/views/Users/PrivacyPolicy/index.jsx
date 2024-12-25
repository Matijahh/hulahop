import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="page-wrapper privacy-policy-page">
      <Helmet>
        <title>{t("Privacy Policy - HulaHop")}</title>
      </Helmet>
      <div className="container">
        <div className="title mb-4">{t("Privacy Policy")}</div>
        <div className="description">
          {t(
            "Dear Users, this page explains our policy regarding: the collection, use and publication of personal data when you use our Service and the choices you have made with that data, in accordance with the Personal Data Protection Act ('Official Gazette of RS', No. 87/2018, hereinafter: Law)."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">{t("1. Definitions")}</div>
        <div className="bold-description mb-2">
          {t("Personal Data -")}
          <span className="description">
            {" "}
            {t(
              "data about a person who can be identified through these data (or through them and other information that we either have or are likely to have)"
            )}
            .
          </span>
        </div>
        <div className="bold-description mb-2">
          {t("Usage Data -")}
          <span className="description">
            {" "}
            {t(
              "Usage data is data that is automatically collected either through the use of our service or through the service infrastructure itself (eg time spent on the visited page)."
            )}
          </span>
        </div>
        <div className="bold-description mb-2">
          {t("Cookies ('cookies') -")}
          <span className="description">
            {" "}
            {t(
              "cookies are data about visited pages that are stored on the User's computer."
            )}
          </span>
        </div>
        <div className="bold-description mb-2">
          {t("Data Controllers –")}
          <span className="description">
            {" "}
            {t(
              "a data controller is a person who (either alone or in cooperation or together with other persons) assesses the purpose and manner in which any personal data is or will be processed. For the purposes of this Privacy Policy, we are the Data Controllers for your data."
            )}
          </span>
        </div>
        <div className="bold-description mb-2">
          {t("Data Processor (or Service Provider) –")}
          <span className="description">
            {" "}
            {t(
              "Data Processor (or Service Provider) is any person (other than an employee of the Data Controller) who processes data on behalf of the Data Controller. We may use the services of different Service Providers to process your data more efficiently."
            )}
          </span>
        </div>
        <div className="bold-description mb-2">
          {t("Data Subject –")}
          <span className="description">
            {" "}
            {t("A Data Subject is any User who has provided their data.")}
          </span>
        </div>
        <div className="bold-description mb-2">
          {t("User -")}
          <span className="description">
            {" "}
            {t(
              "User is an individual who uses our Service. User refers to the Data Subject, which is the object of Personal Data."
            )}
          </span>
        </div>
        <div className="bold-description mt-3 mb-2">
          {t(
            "2. Basic Information on the Collection of Personal Data About Users"
          )}
        </div>
        <div className="description mb-2">
          {t(
            "VGA DESIGN CENTER ALEKSANDAR MIĆIĆ PR, Activity: 1812 Other printing, ADDRESS: 7. JULA 3, 11307 BOLEČ, PIB: 112759904, MB: 66336417 (hereinafter: VGA DESIGN CENTAR) collects and uses your data to enable and improve the service on the HULAHOP internet platform, at the internet address"
          )}{" "}
          <a
            href="www.hulahop.shop"
            target="_blank"
            className="bold-description"
          >
            {" "}
            www.hulahop.shop
          </a>{" "}
          .
          {t(
            "In this sense, we are responsible for the processing of your personal data. By using the Service, you consent to the collection and use of information in accordance with this policy. Unless otherwise specified in this Privacy Policy, the terms of use set forth in this Privacy Policy have the same meanings as those in our Terms and Conditions of Use."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "Any collection, processing and storage of your personal data will be done in accordance with this Privacy Policy, the Law and other valid regulations of the Republic of Serbia."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "Our business and contact details are prominently displayed on the front page of the HULAHOP internet platform, as well as on the CONTACT page within the internet platform."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t(
            "3. What Personal Data Do We Collect, on What Legal Basis and For What Purposes"
          )}
        </div>
        <div className="description mb-2">
          {t(
            "The User can view the HULAHOP internet platform without entering any personal data. On the other hand, certain parts of the HULAHOP internet platform may request some personal data from the User, such as the part related to filling out and sending online forms. The use of these parts of the HULAHOP Internet platform is entirely optional. If the User decides to view or use these parts of the HULAHOP internet platform, there is a possibility of mandatory entry of certain data. If the User does not enter the required data, he will not be able to use the part of the HULAHOP internet platform for which the specified data is required. The User-Data Subject who provided personal data within the framework of filling out and sending the online form, has the right to request their deletion (while VGA DESIGN CENTER has the right to restrict that User's use of those parts of the HULAHOP internet platform) or change. The user's right is also to have an insight into the method of storage and processing of that data. By using the HULAHOP internet platform, the User agrees and fully accepts that the processing or use of personal data, collected through the HULAHOP internet platform, may be entrusted to third parties such as debit/credit card processors, web hosting companies, companies that provide courier services, as well as companies that deal with internet traffic analytics. In such cases, the User's personal data will be available to third parties only to the extent and for the purposes necessary to provide their services."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "Information about the User, such as: name, surname, address of residence (apartment), e-mail address and telephone number; are collected and processed for the purposes of:"
          )}
        </div>
        <div className="description mb-2">
          {t(
            "- using the HULAHOP internet platform and ordering products/items, based on your consent (Article 12, Paragraph 1, Item 1 of the Law). It is considered that the User has expressly and unequivocally given consent at the moment of leaving contact information when ordering the service. The user can revoke the given consent at any time by sending a statement of revocation to the e-mail"
          )}{" "}
          <a
            href="mailto:info@hulahop.shop"
            target="_blank"
            className="bold-description"
          >
            {" "}
            info@hulahop.shop
          </a>
        </div>
        <div className="description mb-2">
          {t(
            "- maintaining the necessary level of security of the HULAHOP internet platform, and based on compliance with the legal obligations prescribed in Art. 16th century 3 of the Law on Electronic Commerce"
          )}
        </div>
        <div className="description mb-2">
          {t(
            "- contact data is collected and processed for the purpose of sending commercial messages, including personalized offers, based on your consent (Article 12, paragraph 1, point 1 of the Law). It is considered that the User has expressly and unambiguously given consent at the moment of leaving contact information when using the HULAHOP internet platform and ordering the service. The user can revoke the given consent at any time by sending a statement of revocation to the e-mail"
          )}{" "}
          <a
            href="mailto:info@hulahop.shop"
            target="_blank"
            className="bold-description"
          >
            {" "}
            info@hulahop.shop
          </a>
        </div>
        <div className="description mb-2">
          {t(
            "- data about persons who interact with us in other ways When interacting with VGA DESIGN CENTER of persons who are not registered Users of the HULAHOP internet platform, VGA DESIGN CENTER collects and processes data about the person who interacts, if it is necessary and justified, for the purpose providing user support, and based on our legitimate interest in the sense of Art. 12th century 1st point. 6 of the Law."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "Analytics – we may employ third parties and companies (Service Providers) to provide services on our behalf, improve our Service, and perform services related to our Service or assist us in analyzing how our Services are used."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "These third parties have access to your Personal Data only to perform these tasks for us and are required not to disclose or use it for any other purpose."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "Use of cookies - VGA DESIGN CENTER uses cookies on its website. and uses remarketing services to advertise on third-party sites after you visit our Service. We use cookies to inform, optimize and provide ads based on your previous visits to our Services."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "The Facebook remarketing service is made possible by Facebook Inc. To learn more about interest-based ads and similar, visit the website:"
          )}{" "}
          <a
            href="https://www.naklik.rs/korisni-saveti/saveti-za-digitalni-marketing/kako-se-reklamirati-na-facebooku-i-instagramu"
            target="_blank"
            className="bold-description"
          >
            {" "}
            https://www.naklik.rs/korisni-saveti/saveti-za-digitalni-marketing/kako-se-reklamirati-na-facebooku-i-instagramu
          </a>{" "}
          /
        </div>
        <div className="description mb-2">
          {t(
            "Facebook adheres only to the Self-Regulatory Principles for Online Behavioral Advertising established by the Digital Advertising Alliance. You can opt out of Facebook and other participating companies through the Digital Advertising Alliance in the US:"
          )}{" "}
          <a
            href="http://optout.aboutads.info"
            target="_blank"
            className="bold-description"
          >
            {" "}
            http://optout.aboutads.info
          </a>
          {t(
            "through the Digital Advertising Alliance of Canada in Canada:"
          )}{" "}
          <a
            href="https://youradchoices.ca/"
            target="_blank"
            className="bold-description"
          >
            {" "}
            https://youradchoices.ca/
          </a>{" "}
          {t(
            "or through the European Alliance for Interactive Digital Advertising:"
          )}
          <a
            href="http://www.youronlinechoices.eu/"
            target="_blank"
            className="bold-description"
          >
            {" "}
            http://www.youronlinechoices.eu/
          </a>
          ,{" "}
          {t(
            "and you can also opt out through the settings on your mobile device. For more information about Facebook's privacy policy, visit Facebook's Data Policy:"
          )}{" "}
          <a
            href="https://www.facebook.com/privacy/explanation"
            target="_blank"
            className="bold-description"
          >
            {" "}
            https://www.facebook.com/privacy/explanation
          </a>{" "}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("4. Disclosure of Data to Third Parties")}
        </div>
        <div className="description mb-2">
          {t(
            "Under certain circumstances, VGA DESIGN CENTER may be required to disclose your personal information if we are required to do so by law or in response to a valid request from government authorities (for example, a court or government agency)."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "VGA DESIGN CENTER may disclose your personal data when we are convinced that it is necessary and when:"
          )}
        </div>
        <div className="description mb-2">
          {t("The legal obligation should be respected")}
        </div>
        <div className="description mb-2">
          {t(
            "The rights or property of VGA DESIGN CENTER should be protected and defended"
          )}
        </div>
        <div className="description mb-2">
          {t(
            "Illegal activities related to the service should be prevented or investigated"
          )}
        </div>
        <div className="description mb-2">
          {t(
            "The personal safety of the Service User or the public should be protected"
          )}
        </div>
        <div className="description mb-2">
          {t("The site should be protected from legal liability")}
        </div>
        <div className="description mb-2">
          {t(
            "VGA DESIGN CENTER can disclose your personal data even in case of your express consent"
          )}
        </div>
        <div className="description mb-2">
          {t(
            "The recipients of data with whom we share your personal data are also certain legal entities with which VGA DESIGN CENTER cooperates and which are also considered processors in relation to the processing of your personal data, such as: banks, courier services, advertisers (re-marketing)."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("5. Data Security")}
        </div>
        <div className="description mb-2">
          {t(
            "The security of your data is important to us, but please note that no form of transmission over the Internet or form of electronic storage is 100% secure. Although we try to use all commercially acceptable means to protect your personal information, we cannot guarantee its absolute security."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "Since some recipients of personal data are located outside the territory of the Republic of Serbia (such as hosting provider companies), your personal data are transferred to countries that are considered by law to provide an adequate level of personal data protection. In case of transfer of personal data to other countries (which are not included in the aforementioned), personal data are transferred with the provision of appropriate protection measures from Article 65 of the Law, i.e. in accordance with Article 69 of the Law."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("6. Personal Data Processing Duration")}{" "}
        </div>
        <div className="description mb-2">
          {t(
            "We process your personal data as long as it is necessary to achieve the purpose of the processing, that is, until the consent is revoked (if the processing is based on consent). We store data for the duration necessary to ensure uninterrupted provision of services to Users, i.e. execution of our contractual obligations from the General Terms of Use, i.e. implementation of the contract with the registered user. Longer processing of data is possible only if it represents a legal obligation or submission, exercise or defense of a legal claim. Specifically, we will keep your personal data as long as you are a registered user of the website, that is, until you submit a request to delete your user account and personal data. After submitting such a request, we have a legal obligation to store certain data, for example identification, for 30 days before final deletion."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">{t("7. Your Rights")}</div>
        <div className="description mb-2">
          {t(
            "VGA DESIGN CENTER strives to allow you to correct, change, delete or limit the use of your personal data within a reasonable framework."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "If you want to correct, modify, delete or limit the use of your personal data, please contact us via email"
          )}{" "}
          <a
            href="mailto:info@hulahop.shop"
            target="_blank"
            className="bold-description"
          >
            {" "}
            info@hulahop.shop
          </a>
          , {t("so that we can make the necessary changes.")}
        </div>
        <div className="description mb-2">
          {t(
            "If you want us to inform you which Personal Data about you are stored with us and if you want to remove them from the system, please contact us via email"
          )}{" "}
          <a
            href="mailto:info@hulahop.shop"
            target="_blank"
            className="bold-description"
          >
            {" "}
            info@hulahop.shop
          </a>
          .
        </div>
        <div className="description mb-2">
          {t(
            "The user has the right to file an objection to the processing of his personal data by VGA DESIGN CENTER based on legitimate interest (in the sense of Article 12, Paragraph 1, Item 6 of the Law). In the case of submitting a complaint, the processing will be terminated, unless there are legal reasons for the processing that outweigh the interests, rights and freedoms of the User or are related to the submission, realization or defense of a legal claim, which VGA DESIGN CENTER will present to the User. If the User has filed an objection regarding processing for the purposes of direct advertising, personal data may not be further processed for such purposes."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "If the processing of personal data is based on consent, the User has the right to revoke consent at any time. Consent can be revoked at any time via the e-mail address:"
          )}{" "}
          <a
            href="mailto:info@hulahop.shop"
            target="_blank"
            className="bold-description"
          >
            {" "}
            info@hulahop.shop
          </a>{" "}
          {t(
            "The revocation of consent does not affect the admissibility of processing based on the consent prior to revocation."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "If the User believes that VGA DESIGN CENTER is processing his personal data contrary to the provisions of the Law, he may at any time submit a complaint to the Commissioner for Information of Public Importance and Protection of Personal Data."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("8. Privacy of Children")}
        </div>
        <div className="description mb-2">
          {t(
            "Our Service does not apply to those under the age of 13 (“Children”)."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "We do not intentionally collect personally identifiable information from individuals under the age of 13. If you are a parent or guardian and find out that your child has sent us personal data, please contact us via email"
          )}{" "}
          <a
            href="mailto:info@hulahop.shop"
            target="_blank"
            className="bold-description"
          >
            {" "}
            info@hulahop.shop
          </a>
          .{" "}
          {t(
            "If we learn that we have collected personal information from children without parental consent, we will take all necessary steps to remove that information from our servers."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("9. Changes to This Privacy Policy")}
        </div>
        <div className="description mb-2">
          {t(
            "We may update this Privacy Policy from time to time. We will notify you of any changes prior to posting the new Privacy Policy on this page."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "We will notify you via a prominent announcement on the HULAHOP internet platform, before the change is implemented. In the event that any future changes to this Privacy Policy imply a reduction of your rights, we will ask you for your express consent to continue using our internet platform."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "We advise you to periodically read this Privacy Policy to check if there have been any changes. Changes to this Privacy Policy are effective when posted on this page."
          )}
        </div>
        <div className="description mb-2">
          {t(
            "By using our website/platform, you automatically accept this Privacy Policy and allow your data to be collected and processed in accordance with this Privacy Policy, the Law and other applicable regulations. If you do not agree with this Privacy Policy, please do not visit or use our website/platform. At any time, we are available for your comments, questions or observations, so feel free to contact us regarding this Privacy Policy via the website"
          )}{" "}
          <a
            href="www.hulahop.shop"
            target="_blank"
            className="bold-description"
          >
            {" "}
            www.hulahop.shop
          </a>{" "}
          {t("or via e-mail address:")}
          <a
            href="mailto:info@hulahop.shop"
            target="_blank"
            className="bold-description"
          >
            {" "}
            info@hulahop.shop
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
