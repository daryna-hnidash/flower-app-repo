import classNames from "classnames";
import { useState } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import "./FaqPage.scss";

type QuestionsAndAnswer = {
  id: number,
  question: string,
  answer: string,
}

const questionsAndAnswers: QuestionsAndAnswer[] = [
  {
    id: 1,
    question: "Do you provide custom floral arrangements?",
    answer: "Yes, we offer custom floral arrangements tailored to your preferences and occasions. You can provide us with your desired color scheme, flower types, and design ideas, and our talented florists will create a beautiful arrangement just for you.",
  },
  {
    id: 2,
    question: "How can I place an order?",
    answer: "You can place an order directly through our website by browsing our selection of flowers and arrangements. Add your chosen items to your cart and proceed to checkout. You can also place an order by calling our shop directly or visiting us in person.",
  },
  {
    id: 3,
    question: "Do you offer delivery services?",
    answer: "Yes, we offer delivery services to local areas. You can choose your preferred delivery date and time during checkout. We also offer same-day delivery for orders placed before a certain time; please check our website for specific details.",
  },
  {
    id: 4,
    question: "What payment methods do you accept?",
    answer: "We accept a variety of payment methods, including major credit and debit cards, as well as other online payment options such as PayPal and Apple Pay. You can select your preferred payment method at checkout.",
  },
  {
    id: 5,
    question: "Can I include a personalized message with my order?",
    answer: "Absolutely! You can add a personalized message during the checkout process. We will include your message on a beautiful card that accompanies your floral arrangement.",
  },
  {
    id: 6,
    question: "Do you offer flower subscriptions or regular deliveries?",
    answer: "Yes, we offer flower subscriptions and regular deliveries for your convenience. You can choose a weekly, bi-weekly, or monthly schedule, and we will deliver fresh flowers to your door on your chosen schedule.",
  },
  {
    id: 7,
    question: "Do you provide care instructions for the flowers?",
    answer: "Yes, we provide care instructions for all our floral arrangements. These instructions will help you keep your flowers fresh and vibrant for as long as possible. Instructions are usually included with your order, or you can find them on our website.",
  },
  {
    id: 8,
    question: "What sets your flower shop apart from others?",
    answer: "Our flower shop stands out due to our commitment to quality, creativity, and customer satisfaction. We source the freshest flowers and materials to create stunning, long-lasting arrangements. Our skilled florists pay close attention to detail and work closely with customers to ensure their vision is brought to life. Additionally, we offer exceptional customer service and a seamless shopping experience.",
  }
]

export const FaqPage = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

  const handleClick = (questionId: number) => {
    activeQuestionId === questionId
      ? setActiveQuestionId(null)
      : setActiveQuestionId(questionId)
  }

  return (
    <div className="faq-page">
      <div className="faq-page__top">
        <h2 className="faq-page__title">
          FAQ
        </h2>
        <Breadcrumbs />
      </div>
      <div className="faq-page__container">
        {questionsAndAnswers.map(item => (
          <div key={item.id}>
            <button
              className={classNames(
                "faq-page__question",
                { "faq-page__question--active": activeQuestionId === item.id }
              )}
              onClick={() => handleClick(item.id)}
            >
              {item.question}
            </button>
            <p
              className={classNames(
                "faq-page__answer",
                { "faq-page__answer--active": activeQuestionId === item.id }
              )}
            >
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
