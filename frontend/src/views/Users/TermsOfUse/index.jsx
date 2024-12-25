import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <div className="page-wrapper terms-of-use-page">
      <Helmet>
        <title>{t("Terms of use - HulaHop")}</title>
      </Helmet>

      <div className="container">
        <div className="title mb-4">{t("Terms of use")}</div>
        <div className="bold-description mb-3">
          {t("Dear users,")} <br />{" "}
          {t(
            "Please read carefully the following General Terms of Use and Privacy Policy before using our website/platform, or using and ordering our services . In order to use this internet presentation/platform set up at www.hulahop.shop (here in after referred to as HULAHOP internet presentation/platform or HULAHOP), you need to familiarize yourself with and fully agree with these General Terms of Use and the Privacy Policy."
          )}
        </div>
        <div className="bold-description mb-4">
          {t("General Terms of Use of the HulaHop Internet Platform:")}
        </div>
        <div className="description">
          {t(
            "These General Terms of Use (hereinafter: General Terms) have the nature of a contract between:"
          )}
        </div>
        <div className="description">
          1. VGA DESIGN CENTER ALEKSANDAR MIĆIĆ PR, Activity: 1812 Other
          printing, ADDRESS: 7. JULA 3, 11307 BOLEČ, PIB: 112759904, MB:
          66336417 ( hereinafter: VGA DESIGN CENTER)
        </div>
        <div className="description">
          {t(
            "2. Each individual user of the HULAHOP internet platform (hereinafter: User)."
          )}
          <div className="description">
            {t(
              "By voluntarily using any segment of the HULAHOP internet platform, in any way, the User confirms that he is familiar with and fully agrees with these General Terms and Conditions and the Privacy Policy."
            )}
          </div>
        </div>
        <div className="bold-description mt-4 mb-2">
          {t("1. General Provisions")}
        </div>
        <div className="description">
          {t(
            "These General Terms and Conditions regulate the conditions for the User's registration, the method of registration, the rights and obligations of the User and VGA DESIGN CENTRA, the way of ordering services, the provision of services by VGA DESIGN CENTRA, the protection of copyrights and other intellectual property rights and other important issues that are important for the functioning and use of the HULAHOP internet platform."
          )}
        </div>
        <div className="description">
          {t(
            "By registering for access to the HULAHOP internet platform for the purpose of performing services and sales, by one-time access to the HULAHOP internet platform for the purpose of placing orders and services, and accessing the HULAHOP internet platform for informational purposes, the User irrevocably declares that he is familiar with the content of the General Conditions, that he fully accepts its provisions , as well as being informed of the obligation to act in accordance with the applicable regulations of the Republic of Serbia when using the HULAHOP internet platform for any purpose."
          )}
        </div>
        <div className="description">
          {t(
            "The contracting parties agree that in order to fulfill its obligations, it is necessary for VGA DESIGN CENTER to collect, process and store the User's personal data in accordance with the applicable regulations of the Republic of Serbia and the Privacy Policy. By accepting these General Conditions, the User confirms that he is familiar with and fully agrees with the Privacy Policy, and gives his express consent to the collection and processing of personal data."
          )}
        </div>
        <div className="description">
          {t(
            "Any use of the HULAHOP internet platform that is not in accordance with these General Terms and Conditions will be considered a violation of the General Terms and Conditions by the User, so VGA DESIGN CENTER is authorized and has the right to take appropriate measures against that User in terms of usage restrictions and/or (temporary or permanent) termination of the user account."
          )}
        </div>
        <div className="description">
          {t(
            "In carrying out its registered business activity, VGA DESIGN CENTER provides the User with a fee-based service in the form of printing goods according to the User's wish and design on one or more items offered on the HULAHOP internet platform and sending them to the User's address via the courier service with which VGA DESIGN CENTER currently has concluded cooperation agreement. Services for a fee that VGA DESIGN CENTER provides to the User are within the terms and at the prices stated in RSD currency on the HULAHOP internet presentation, stated in these General Terms and Conditions and in accordance with the law. The fee for sending and delivering the package is paid by the User to the courier service according to the price list of the courier service."
          )}
        </div>
        <div className="description">
          {t(
            "The user receives a fiscal invoice for the ordered product and is entitled to all rights under the Law on Consumer Protection of the Republic of Serbia."
          )}
        </div>
        <div className="description">
          {t(
            "The user is obliged to, for the press service, use and request content (image, text, photo, caption, slogan, graphic solutions, design, etc.) that is exclusively his property or in respect of which he has all the necessary rights or authorizations to use individual thing with such content. The User is solely responsible for the ordered content and the individual item with such content."
          )}
        </div>
        <div className="description">
          {t(
            "User - a natural person can be any adult, capable of doing business."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">{t("2. Registration")}</div>
        <div className="description">
          {t(
            "In order to use the services of the HULAHOP internet platform in terms of ordering and printing services, it is necessary to register the User (opening a user account), which is free of charge. Registration is done by logging in to the HULAHOP internet platform, where the User enters an e-mail address, password, and all other personal data that are listed as mandatory. Only registered and logged in User can order printing service of own design. In addition, VGA DESIGN CENTER reserves the right to decide to conclude a special contract with a specific User on the further distribution of goods and/or the use of its design for the purposes of advertising the services of the HULAHOP internet platform, hereinafter referred to as the Design Use Agreement, with an agreed monthly fee to the User. A user can have only one registered user account."
          )}
        </div>
        <div className="description">
          {t(
            "The user can refuse to enter personal data when registering a user account, but in that case he cannot use the HULAHOP online platform for ordering and service."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("3. Restrictions When Using the HulaHop Internet Platform")}
        </div>
        <div className="description">
          {t(
            "The user agrees that when using the HULAHOP internet platform, he will observe the following restrictions:"
          )}
        </div>
        <div className="description">
          {t(
            "- it is not allowed to post information that contains falsehoods and lies, that can mislead anyone, that offends anyone, that causes harm to anyone , and take advantage of anyone's gullibility. Excerpt from the Law on Consumer Protection:"
          )}{" "}
          "
          {t(
            "A business practice that threatens to significantly disrupt the economic behavior of a clearly defined group of consumers, who, due to their mental or physical weakness, age or recklessness, are particularly sensitive to that type of business practice or to a given product, provided that the trader could reasonably be expected to foresee this, it is estimated according to the average consumer of that group of consumers."
          )}
          "
        </div>
        <div className="description">
          {t(
            "- it is not allowed to enter into any transaction or carry out any transaction that may lead to the violation of applicable laws by VGA DESIGN CENTER and/or other Users,"
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("4. Illegal Actions When Ordering Patterns for Printing")}
        </div>
        <div className="description">
          {t(
            "The user agrees that when ordering patterns for printing on the HULAHOP internet platform, he will observe the following restrictions:"
          )}
        </div>
        <div className="description">
          {t(
            "- it is not allowed to order and send patterns that in any way contradict the provisions of the Law on Copyright and Related Rights , the Law on Trademarks and other valid regulations of the Republic of Serbia,"
          )}
        </div>
        <div className="description">
          {t(
            "- it is not allowed to order printing designs that contain copyrighted works, marks protected by a trademark or other intellectual property in respect of which the User does not have authorization from their holder/owner for use"
          )}
        </div>
        <div className="description">
          {t("- it is not allowed to order pornographic content")}
        </div>
        <div className="description">
          {t(
            "- it is not allowed to order designs that contain the logo of companies and other legal entities, i.e. merchants and other internet portals/presentations/platforms, without their express consent or permission."
          )}
        </div>
        <div className="description">
          {t(
            "- it is not allowed to show the faces of persons and details that can lead to the identification of persons on the designs that are ordered, without their express consent"
          )}
        </div>
        <div className="description">
          {t(
            "- it is not allowed to order designs in which people with physical defects, disabilities, members of minorities and/or vulnerable social groups, as well as any kind of racial, religious or political discrimination"
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("5. Trade and Other Business Relations Between Users")}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER does not mediate any trade and/or business relations between Users. Any potential trade, contact and/or exchange between Users is at the User's own risk."
          )}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER will not bear any responsibility for any damage caused during any transactions between Users. In any case, users are urged to be careful when trading with each other and/or other types of relationships and communication."
          )}
        </div>
        <div className="description">
          {t(
            "Users - natural persons are not allowed to use the HULAHOP internet platform for trade, bearing in mind that trade is an economic activity that represents a set of business activities related to the procurement and sale of goods, as well as the provision of services with the aim of making a profit, which is reserved only for VGA DESIGN CENTER, as a legal entity, according to a special law."
          )}
        </div>
        <div className="description">
          {t(
            "The User - a natural person may post his/her ordered designs on his/her own accounts on social networks for the purpose of promoting personal creativity, and such activity may not represent a business or professional activity, nor a permanent source of income for that User. Designs, which will be the subject of the Agreement on the use of designs from paragraph 1., the User can also publish on his public personal accounts, but under the conditions determined by the Agreement, because they serve to promote the HULAHOP internet platform."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("6. Copyrights and Other Intellectual Property Rights")}
        </div>
        <div className="description">
          {t(
            "It is not permitted to copy any content or parts of the content published on the HULAHOP internet platform. The content includes the textual content of the pages, designs for printing, information about the Users, photos, logos, graphic solutions, program code, as well as all other content that is considered copyright according to the Law on Copyright and Related Rights."
          )}
        </div>
        <div className="description">
          {t(
            "The user reserves the right over the designs - the content that he submitted for the purpose of performing the printing service and ordering the printed product, the use of which may be allowed by VGA DESIGN CENTER, under the conditions described in the Agreement on the use of designs from paragraph 1."
          )}
        </div>
        <div className="description">
          {t(
            "In the event that VGA DESIGN CENTER and the User conclude the aforementioned Agreement on the use of designs from paragraph 1, the user accepts that the content of the ordered service, the text, the appearance of the goods with its content, as well as his contact phone number will be published on the HULAHOP internet presentation, and that as such it will be publicly available to all internet users. The user accepts that the data from paragraph 1, to the extent and scope in which it is necessary, will be published on social networks or other marketing channels, for promotional purposes and for the purpose of advertising the services of the HULAHOP internet platform, and that as such they will be available to all internet users and other interested parties. The User can withdraw his consent at any time by sending a statement of withdrawal of consent to the address www.hulahop.shop, in which case VGA DESIGN CENTER reserves the right to limit or cancel the User's account and to terminate the concluded Agreement on the use of designs, without further obligations. The monetary compensation agreed with the User for the use of the design for promotional purposes expressed in RSD currency, and the method of payment, will be subject to agreement and defined in the Agreement itself. The user is obliged to regulate his own income from fees in the legal and tax system of the Republic of Serbia, according to the current regulations."
          )}
        </div>
        <div className="description">
          {t(
            "The User is aware and agrees that for the purposes specified in paragraph 2 of this section, VGA DESIGN CENTER has the right to electronically process, modify, or adjust the User's content in order to achieve the appropriate visual effect, resolution or for other justified reasons."
          )}
        </div>
        <div className="description">
          {t(
            "The ordered designs must in all respects be in accordance with the Law on copyright and related rights and other applicable regulations of the Republic of Serbia. The responsibility for the same lies exclusively with the User who ordered the pattern. In the event that VGA DESIGN CENTAR, by a legally binding decision (court or arbitration), is obliged to compensate another person for damages, or a state or regulatory authority imposes a penalty for a misdemeanor or other monetary sanction, and for the reason, or in connection with what If the user, by ordering a protected design on the HULAHOP internet platform, violated someone else's rights or acted contrary to these General Terms and Conditions or valid regulations of the Republic of Serbia, that user is obliged to fully indemnify VGA DESIGN CENTAR, i.e. compensate him for the entire amount that VGA DESIGN CENTAR paid."
          )}
        </div>
        <div className="description">
          {t(
            "The HULAHOP internet platform may also contain elements on which the exclusive copyright and other rights in the field of intellectual property are held by third parties, such as the contents of business partners, advertisers and authors of texts intended for the blog. Those persons have sole responsibility for the content on which they are the holders of those rights, regardless of the fact that such content is on the HULAHOP internet platform."
          )}
        </div>
        <div className="description">
          {t(
            "The User agrees that VGA DESIGN CENTER has the right to insert a watermark or other mark referring to VGA DESIGN CENTAR, in any design that the User sends for the printing service, and conclude an Agreement on the use of his design with VGA DESIGN CENTAR, as well as on processing dimension of the pattern in order to fit into the integral visual scheme of the HULAHOP internet platform."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("7. Protection of Rights")}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER will endeavor to provide full support for the protection of personal rights, privacy, property rights and intellectual property rights to all holders of those rights or to those whose rights have been infringed on every single occasion, by, without delay, on reasoned request:"
          )}
        </div>
        <div className="description">
          {t(
            "- supported by appropriate documentation and evidence, remove the content so that it is not publicly available,"
          )}
        </div>
        <div className="description">
          {t(
            "- submit to the competent authority data about the User whose design displayed on the HULAHOP internet platform violates one of the listed or other rights, all in accordance with the applicable regulations of the Republic of Serbia."
          )}
        </div>

        <div className="bold-description mt-3 mb-2">
          {t("8. Collection and Processing of Personal Data")}
        </div>
        <div className="description">
          {t(
            "Collection, processing and storage of data by VGA DESIGN CENTER is carried out in accordance with the applicable regulations of the Republic of Serbia and the Privacy Policy, which is available for inspection by all Users and visitors of the HULAHOP internet platform."
          )}
        </div>
        <div className="description">
          {t(
            "By accepting these General Terms and Conditions, each User confirms that they are familiar with and fully agree with the Privacy Policy."
          )}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER collects personal data from its (registered) Users and other persons. The collection of personal data is necessary for the purpose of identifying the service provider - the User."
          )}
        </div>
        <div className="description">
          {t(
            "All other data collection purposes are listed in the Privacy Policy. The method of processing, data storage, as well as the duration of data storage, is also specified in the Privacy Policy."
          )}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER can give access to User's personal data only to persons employed by VGA DESIGN CENTAR. Users should be aware that certain personal data, i.e. those data that are part of the description of the author of the design be available to other Users, i.e. be publicly available on the Internet."
          )}
        </div>
        <div className="description">
          {t(
            "Providing personal information for identification is voluntary. The user who does not want to enter his personal data when registering or ordering a design print, accepts that in that case he will be prevented from registering on the HULAHOP internet platform, that is, he will not be able to complete the order. Such a User can still use the HULAHOP internet platform for the purposes of content search, familiarization with the internet presentation and for informational purposes."
          )}
        </div>
        <div className="description">
          {t(
            "In case the User wants to order the service of pattern printing and delivery of the finished product, he is obliged to identify himself with personal data, which must be accurate and up-to-date."
          )}
        </div>
        <div className="description">
          {t(
            "The service user has the right to revoke the consent given by accepting these General Terms and Conditions for the collection and processing of personal data, as well as the right to request their modification and deletion. The User can always be informed about these and other rights of the User in relation to personal data, as well as how to exercise those rights, in the Privacy Policy. In the event that due to the deletion of data there are no conditions for further provision of services, the User may be denied access to parts or the entire HULAHOP internet platform."
          )}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER is not responsible for the accuracy of data entered by other persons using the HULAHOP internet platform, as well as for the accuracy of the results of the processing of such data."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("9. Violation of the General Conditions")}
        </div>
        <div className="description">
          {t(
            "For any violation of the provisions of these General Conditions, non-compliance with the restrictions specified in this text or violation of the law by the User, VGA DESIGN CENTER has the right to prevent the User from completing the order, i.e. to undertake all actions against that User and use all rights provided by law."
          )}
        </div>
        <div className="description">
          {t(
            "The measures from paragraph 1 of this section can also be applied in cases where there has been no violation of the General Conditions, with the aim of preventing the occurrence of damage, or in cases where due to certain actions or inactions by the User, the business activity of VGA DESIGN CENTER is hindered or operation of the HULAHOP internet platform."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("10. Limitation of Responsibility")}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER does not guarantee the uninterrupted use of the HULAHOP internet platform, nor is it in any way responsible for the possible temporary unavailability of any individual part of the HULAHOP internet platform, nor for partial or complete non-functioning or incorrect functioning thereof, nor for the consequences that could perform with the use of the HULAHOP internet platform."
          )}
        </div>
        <div className="description">
          {t(
            "Due to force majeure or technical problems, it is possible that the HULAHOP internet platform is not available to all or some of the Users during certain periods of time. In such cases, VGA DESIGN CENTER is not responsible for the consequences that may arise due to delays and/or incorrect processing of electronic data, nor is it responsible for any damage caused by the cessation of broadcasting of advertisements."
          )}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER is not liable for any damage or injury that could arise from hidden defects, errors, interruptions, deletions, malfunctions, delays in operation, interruptions in communications, theft, destruction or unauthorized access to data, alteration or misuse of data by third parties. persons, termination of the Agreement on the use of designs, behavior contrary to these General Terms and Conditions, etc."
          )}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER reserves the right to refuse to order the printing service at any time due to violation of the rules stipulated in the General Terms and Conditions, violation of the rights of other Users, violation of applicable laws, or for other reasons, and in that case it is not responsible for any damage caused by this act."
          )}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER does not guarantee the accuracy, reliability and up-to-dateness of the data that the User enters during registration on the HULAHOP internet platform, and the User himself, by accepting these General Terms and Conditions, agrees that he is obliged to enter accurate data during registration, and that VGA DESIGN CENTER is neither in any way responsible for any damage caused to the User or any third party by entering incorrect data."
          )}
        </div>
        <div className="description">
          {t(
            "VGA DESIGN CENTER is not responsible for any content sent or shared by Users themselves, including but not limited to photos, designs created in appropriate graphic applications, and other user-generated content, since it does not initiate, does not select user content, does not excludes or changes data in user content, nor chooses the recipient of user content itself."
          )}
        </div>
        <div className="description">
          {t(
            "The User is aware and by accepting these General Terms and Conditions agrees that VGA DESIGN CENTER cannot be held responsible for the actions and behaviors of other Users or third parties, as well as that the risk of possible damage is entirely borne by the User."
          )}
        </div>
        <div className="description">
          {t(
            "The use of the HULAHOP internet platform is the sole responsibility of the User. VGA DESIGN CENTER reserves the right to change, cancel (temporarily or permanently) any part of the HULAHOP internet platform, as well as the services it provides, without prior or subsequent approval or notification of the User, in accordance with good business practices, and especially in order to preserve the integrity and regular maintenance of HULAHOP internet platform and data security, in which cases they will not be responsible for any damage caused by this act."
          )}
        </div>
        <div className="bold-description mt-3 mb-2">
          {t("11. Contact and Communication with the User Support Department")}
        </div>
        <div className="description">
          {t(
            "The user accepts the possibility of contact by e-mail or phone number in order to fulfill the desired order, which was the purpose of visiting the HULAHOP internet platform, as well as in order to help and/or answer questions."
          )}
        </div>
        <div className="description">
          {t(
            "To contact the Customer Service Department at the VGA DESIGN CENTER, Users are directed to the contact form, which is available at https://hulahop.shop/kontakt. The phone number listed on the front page of the HULAHOP internet platform is also available, as well as the contact via social networks, whose links are posted on the front page of the HULAHOP internet platform."
          )}
        </div>
        <div className="description">
          {t(
            "The response of the administrator or user team of VGA DESIGN CENTER does not necessarily reflect the viewpoint of VGA DESIGN CENTER, and accordingly the User cannot exercise any rights based on such written correspondence. It is not allowed to publish any written correspondence of the Customer Service Department at VGA DESIGN CENTER with the User without the written permission of VGA DESIGN CENTER or its authorized person."
          )}
        </div>

        <div className="bold-description mt-3 mb-2">
          {t("12. Amendments to the General Terms")}
        </div>
        <div className="description">
          {t(
            "These General Terms and Conditions are subject to change. In case of significant changes, VGA DESIGN CENTER will inform all registered Users about the changes in an active way, for example by e-mail or clearly visible notices. VGA DESIGN CENTER reserves the right to ask the User to re-accept the General Conditions for using the HULAHOP internet platform, and to deny access to the User who does not accept the changed General Conditions."
          )}
        </div>
        <div className="description">
          {t(
            "If you do not agree with the provisions of these General Conditions, please do not visit or use the HULAHOP internet presentation/platform."
          )}
        </div>
        <div className="description mt-5">
          {t(
            "At any time, we are available for your remarks, questions or suggestions, contact us via e-mail address:"
          )}
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

export default TermsOfUse;
