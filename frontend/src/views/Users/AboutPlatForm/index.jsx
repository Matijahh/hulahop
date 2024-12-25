import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { get, map, size } from "lodash";
import { getImageUrlById } from "../../../utils/commonFunctions";

import SliderComponent from "../../../components/SliderComponent/SliderComponent";

import { LoaderContainer } from "../../../components/Loader";
import { Helmet } from "react-helmet";

const AboutPlatForm = () => {
  const [loading, setLoading] = useState(false);
  const [aboutSliderList, setAboutSliderList] = useState([]);

  const { t } = useTranslation();

  const getAboutSliderList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/about_page_slider");

    if (response) {
      const { data } = response.data;
      setAboutSliderList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    getAboutSliderList();
  }, []);

  return (
    <>
      {loading && <LoaderContainer />}
      <div className="page-wrapper about-platform-page">
        <Helmet>
          <title>{t("About Platform - HulaHop")}</title>
        </Helmet>
        <div className="about-hero-section">
          <div className="about-slider">
            <SliderComponent dots={false} arrows={true} slidesToShow={1}>
              {size(aboutSliderList) > 0 &&
                map(aboutSliderList, (item) => {
                  return (
                    <div className="about-platform-slide">
                      <div
                        className="about-platform-slide-box"
                        style={{
                          backgroundImage: `url(${getImageUrlById(
                            get(item, "image_id", "")
                          )})`,
                        }}
                      >
                        <div className="about-slider-wrapper">
                          <div className="description-box">
                            <h5>{t(get(item, "description", ""))} </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </SliderComponent>
          </div>
        </div>
        <div className="about-decription-sectiopn">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="hero-section">
                  <h3 className="banner-head m-0">{t("More About Hulahop")}</h3>
                </div>
              </div>
              <div className="col-12">
                <div className="about-platform-decription">
                  <p>
                    {t(
                      "The hulahop.shop platform is a multivendor Print on Demand (POD) marketplace with an additional personalized POD service for individuals. More precisely, the first Serbian POD platform where the Print on Demand service can be used by everyone! Until now, you could start your business through foreign or domestic platforms limited only to that type of service, or you could only order personalized printing without the possibility of starting your own store. We have created a platform for everyone who wants to express their creativity and earn money in an interesting and simple way, for everyone who wants to order their creations, but also for those who just want us to print their personalized motif on one of the items from our offer. Finally everything in one place!"
                    )}
                  </p>
                  <h5>{t("What can you do on the hulahop.shop platform?")}</h5>
                  <p>
                    {t(
                      "The possibilities of the platform are multiple, find the option that suits you in the following text."
                    )}
                  </p>
                  <p>
                    {t(
                      "About products - In this section you can see all the available items that we print on, with details: appearance, description, sizes, colors, type of print, dimensions, maintenance method...whether you want to set up your store on the platform, whether you want to order a product from one of the stores, whether you want to order a product with your own design, we recommend that you look carefully at the range. If you can't find the right item for you, ask us, we'll try to help."
                    )}
                  </p>
                  <p>
                    {t(
                      "Design it yourself - Need a quick gift? Do you need an unusual t-shirt for a party, or do you just want to have your own coffee mug, with a picture or quote that will cheer you up at work in the morning? To order individual printing on items, personally for you, select this section, and follow the instructions. On our platform, you have the opportunity to create a printed product for yourself on any of the items from the offer, independently of our partners' stores, and order in a few steps. Choose an article (or articles) from the offer, insert text, play with fonts, colors, insert an image (your own or one from the offer), and in a few steps you can design your own printed product, which we will print for you and send it to your address. . Do your friends like the things you create? Open an online store!"
                    )}
                  </p>
                  <p>
                    {t(
                      "Our sellers - If you want to order some of the items from the designer offer of our partners, select this section, browse the store's offers, choose, order. Hmm...can you do better than them? Do you want your logo to be here and open your online store? Here's how:"
                    )}
                  </p>
                  <h5>{t("Want your store on the hulahop.shop platform?")}</h5>
                  <p>
                    {t(
                      "In the following text, you will find out how you can start your own designer line for free, with little effort, or improve a line that you have been building for some time. In short, the story is not complicated, it does not require you: initial investments, warehouse, space lease, previous programming knowledge. Start your online store on our platform with our articles, on which we print your motifs. If you don't have one already registered, you don't need to open a company, because we send the ordered printed items, with the invoice for the services, to the end customer. YOU DON'T PAY US ANYTHING :) You take the profit as the difference between our price to you and your price to the end customer. You form your price quite freely, based on your own assessment of the value of your design. If it sounds great or at least interesting, read on."
                    )}
                  </p>
                  <h5>
                    {t(
                      "Why start a 'Print on Demand' business or order printing exactly on the hulahop.shop platform?"
                    )}
                  </h5>
                  <p>
                    {t(
                      "The idea of ​​Print on Demand itself is not new, it has existed in the world of printing for some time. Only, there is one catch, not everyone can (or doesn't want to) do it:) The limitations are various, and only some of them are: limited technical capabilities, complicated implementation of services and a complex logistics system. The hulahop.shop platform is proof that all limitations can be overcome with hard work and persistence. Well, truth be told, there were also years of experience in print, online business, textiles, lots of coffee and high blood pressure :)"
                    )}
                  </p>
                  <p>
                    {t(
                      "Our main advantage over others is, above all, our technical capabilities. These are: the possibility of printing large dimensions on textiles, in full color, using the DTG (Direct-to-Garment) printing technique, better known in our country as Digital printing on textiles . This printing, but also others: DTF (Direct-to-Film), sublimation, UV digital printing, laser engraving, digital printing on canvas - digital printing of large formats (plotting), screen printing ... we work without subcontractors, on our own devices . In this way, we raise the quality control and printing process to a higher level."
                    )}
                  </p>
                  <p>
                    {t(
                      "Textile items from the offer are mostly sewn according to our strict standards and in domestic companies. In this way, we can expand the range of textile articles for printing completely independently of importers of finished goods of dubious quality and uncertain arrival dates. Soon we will add to the offer: hoodies, several models of notebooks, pillowcases, socks, suits for babies..."
                    )}
                  </p>
                  <p>
                    {t(
                      "All this means that we control the quality and constantly work on: articles for printing, quality of printing and the delivery process, completely from one place . This fact brings you the following advantages: you do not have to have a warehouse, nor expose yourself to any unforeseen or anticipated costs before the sale. Few will tell you that he takes care of your expenses, as we do."
                    )}
                  </p>
                  <p>
                    {t(
                      "On the other hand, it is very important for the stability of the project that we also control all IT processes related to the platform within the company, which gives you full support for developing your own online sales, without investing in expensive websites and web presentations."
                    )}
                  </p>
                  <p>
                    {t(
                      "Other similar platforms or services, at some point inevitably encounter problems in terms of: logistics, product quality, print quality or web presentation system maintenance. We overcome all this with a unique All-In-One Place approach, focusing on 3 important elements:"
                    )}
                  </p>
                  <ul>
                    <li>
                      {t(
                        "Promotion of a new product on the market, using modern digital advertising techniques"
                      )}
                    </li>
                    <li>
                      {t(
                        "Introducing new features, innovations in the range of press items"
                      )}
                    </li>
                    <li>
                      {t(
                        "Improving the existing product quality, by introducing the most modern printing techniques in the production process"
                      )}
                    </li>
                  </ul>
                  <h5>
                    {t("How to start your store on the hulahop.shop platform?")}
                  </h5>
                  <p>
                    {t(
                      "In the Instructions section , follow the step-by-step instructions, which all go like this:"
                    )}
                  </p>
                  <p>
                    {t(
                      "You register as a seller , according to the steps in the Instructions, you enter the necessary data, thereby opening your virtual online store with the name you want."
                    )}
                  </p>
                  <p>
                    {t(
                      "You browse the products from our offer and choose the ones you want to offer to your customers, with your motifs that we print. Detailed instructions are in the How to insert items into the store section . This is how your personal brand and your window is created. With your choice, you are NOT BUYING from us, but you are giving us information about which products we should provide for your offer to further customers. It is also very practical that you can form an offer completely according to your desire and feeling, for example: you don't have to offer all colors in t-shirts if you don't want to, you can choose only white and black, or only white t-shirts, or only black t-shirts... it all depends from your idea and the brand you want to build, and you can change the initial options at any time :)"
                    )}
                  </p>
                  <p>
                    {t(
                      "You've chosen the items to feature your design on, now you're putting your design on them. Each item has a maximum print size field and this should be taken into account. In order to make the process as easy as possible and speed up the process, the parameters are set so that it will be visible to you how much you can 'stretch' the motif, don't worry :)"
                    )}
                  </p>
                  <p>
                    {t(
                      "Set up your store as you see fit, or in other words, this is the 'fine tuning' step. Now you set your logo, define colors for your store, form prices, set up links to your pages on social networks and the like. In commercial terms: you arrange and beautify your window, shelves, polish the board :) Over time, new ideas will come to you, for starters is enough to make it transparent, simple, and afterwards you can always add or remove something. We help you with detailed instructions."
                    )}
                  </p>
                  <p>
                    {t(
                      "All stores are visible on the home page by name, in the section Our sellers , after selecting this section, a potential customer clicks on your store and the purchase process can begin."
                    )}
                  </p>
                  <p>
                    {t(
                      "When the customer chooses your product, color, and size (in the case of textile products), enters the data to be sent and confirms the order, a purchase order is created that reaches you and us for confirmation. After checking and confirming, we print, package the order and ship it. You and the customer receive a notification about the estimated delivery time, and information about the shipment number for tracking. Before sending, you will have information on the status of the production at any time via the platform. Upon receipt, the customer pays for the package and shipping costs, which completes the delivery. Of course, all the steps are available to the customer in detail in the How to buy section , and we take care of the process from receiving the order to the end."
                    )}
                  </p>
                  <p>
                    {t(
                      "Example of earnings: a customer chooses an item in your store, with one of your motifs. The customer buys the item at the price you set. You form the price by adding the amount you want to earn to our price of the item to you. Once a month, the Post Office pays out the received money, then we make a breakdown, calculation and payment of your profit."
                    )}
                  </p>
                  <p>
                    {t(
                      "Have more questions? No problem:) Our email for details and help is: vga.centar@gmail.com"
                    )}
                  </p>
                  <h5>{t("Some tips for your new business (free too):")}</h5>
                  <p>
                    {t(
                      "We recommend that you devote a little more effort and time to creating the name and logo of your brand, after all, it is the first information that a potential customer has about you:) Ask for the help of a friend who understands a little more about these details, there is no shame, you will take him out for a drink..."
                    )}
                  </p>
                  <p>
                    {t(
                      "Your product will cost, how much - you will decide that yourself, just remember: people have lived and can continue to live without a T-shirt, bag, mug or umbrella with your motif. Do not underestimate the value of your work, but try to make the price acceptable. Selling is not an easy job, believe me. Be guided by both your heart and your mind, emotion buys a product but your wallet pays for it :)"
                    )}
                  </p>
                  <p>
                    {t(
                      "Our posts on social networks, in addition to advertising the platform itself, will also be dedicated to our partners, you. Don't get enough of that, open your accounts, work on your brand. Give a gift every now and then. People like to show off when they get something nice and different, and it's a great advertisement for you."
                    )}
                  </p>
                  <p>
                    {t(
                      "If you're still hesitating, there's no reason. Maybe you think you're not creative, maybe you really aren't (no need to worry). You might think you have no sense for visual identity, witty slogans, or deep and ambiguous puns. And maybe you just have to try:) It will only cost you a little time, you will learn something new, and a little gymnastics for the brain and fresh coins will definitely be nice."
                    )}
                  </p>
                  <h5>
                    {t(
                      "We look forward to socializing and cooperating with you in advance, and when the first money from the sale comes in, you can treat us to some lemonade or cakes, we don't refuse :)"
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPlatForm;
