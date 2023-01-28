import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';

const options = ['good', 'neutral', 'bad'];
export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = event => {
    // console.log(event.target.name);
    const { name } = event.target;
    switch (name) {
      case 'good':
        // console.log(value);
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const values = Object.values([good, neutral, bad]);
    return values.reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = (total, good) => {
    return Math.round((good / total) * 100);
  };

  //

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification massage={'There is no feedback'} />
        )}
      </Section>
    </>
  );
}

// -------------------------------------------------------------------------------
// class OldApp extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleFeedback = option => {
//     this.setState(prevState => ({
//       [option]: prevState[option] + 1,
//     }));
//   };

//   countTotalFeedback = () => {
//     const values = Object.values(this.state);
//     return values.reduce((acc, value) => acc + value, 0);
//   };

//   countPositiveFeedbackPercentage = (total, good) => {
//     return Math.round((good / total) * 100);
//   };

//   render() {
//     const options = Object.keys(this.state);
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedbackPercentage(
//       total,
//       good
//     );

//     return (
//       <>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={options}
//             onLeaveFeedback={this.handleFeedback}
//           />
//         </Section>
//         <Section title="Statistics">
//           {total ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           ) : (
//             <Notification massage={'There is no feedback'} />
//           )}
//         </Section>
//       </>
//     );
//   }
// }
