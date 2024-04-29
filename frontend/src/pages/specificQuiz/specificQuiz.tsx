import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import { Container, Typography, Paper, Radio, RadioGroup, FormControlLabel, Checkbox, FormControl, FormLabel, FormGroup, TextField, Button, IconButton } from '@material-ui/core';
import { DragHandle } from '@material-ui/icons';
import { useApolloClient } from '@apollo/client';
import { useParams } from 'react-router-dom';

interface Answer {
  id: number;
  answer_content: string;
  textAnswer: boolean;
}

interface Question {
  id: number;
  question_type: string;
  question_content: string;
  answers: Answer[];
}

interface Result {
  quiz_id: number
  questions: ResultQuestions []
  result: number
  maxResult: number
}

interface PersonalAnswers{
  question_id: number
  answer_ids: number []
  text_answer: string
}

interface ResultQuestions{
  question_id: number
  question_content: string
  question_type: string
  correct_answer_ids: number []
  correct_text_answer: string
}

interface FindFullQuestionsQuery {
  findFullQuestions: Question[];
}

interface CheckAnswers {
  checkAnswers: Result
}


const FIND_FULL_QUESTIONS = gql`
  query FindFullQuestions($quiz_id: Int!) {
    findFullQuestions(quiz_id: $quiz_id) {
      id
      question_type
      question_content
      answers {
        id
        answer_content
        priority
      }
    }
  }
`;

const CHECK_ANSWERS = gql`
  query CheckAnswers($quizId: Int!, $answers: [checkQuestionInput!]!) {
    checkAnswers(quiz_id: $quizId, student_answers: $answers) {
      quiz_id
      questions {
        question_id
        question_content
        question_type
        correct_answer_ids
        correct_text_answer
      }
      result
      maxResult 
    }
  }
`;

const QuizQuestionsPage = (): JSX.Element => {
  const client = useApolloClient();
  const { quizId } = useParams<{ quizId?: string }>(); 

  // Pobranie pytań z quizu
  const { loading: questionsLoading, error: questionsError, data: questionsData } = useQuery<FindFullQuestionsQuery>(FIND_FULL_QUESTIONS, {
    variables: { quiz_id: parseInt(quizId || "0") }, 
  });

  // Symulacja danych odpowiedzi
  const mockData = {
    quiz_id: 2,
    student_answers: [
      { question_id: 2, answer_ids: [3] },
      { question_id: 3, answer_ids: [7] },
      { question_id: 4, answer_ids: [11, 12] },
      { question_id: 5, answer_ids: [15, 16, 17, 18] },
      { question_id: 6, textAnswer: "1930" }
    ]
  };

  const [answers, setAnswers] = useState<{ [questionId: number]: Answer[] }>({});

  const handleSingleChoiceChange = (questionId: number, answerId: string) => {
    setAnswers({ ...answers, [questionId]: [{ id: parseInt(answerId), answer_content: '', textAnswer: false }] });
  };

  const handleMultipleChoiceChange = (questionId: number, answerId: string) => {
    const selectedAnswers = answers[questionId] || [];
    const answerIndex = selectedAnswers.findIndex(answer => answer.id === parseInt(answerId));
    if (answerIndex !== -1) {
      selectedAnswers.splice(answerIndex, 1);
    } else {
      selectedAnswers.push({ id: parseInt(answerId), answer_content: '', textAnswer: false });
    }
    setAnswers({ ...answers, [questionId]: selectedAnswers });
};

  const handleTextAnswerChange = (questionId: number, text: string) => {
    setAnswers({ ...answers, [questionId]: [{ id: 0, answer_content: text, textAnswer: true }] });
  };

  /*
  const handlePriorityChange = (questionId: number, answerId: number, change: number) => {
    const updatedAnswers = answers[questionId].map(answer => {
      if (answer.id === answerId) {
        if (answer.priority !== undefined) {
          return { ...answer, priority: answer.priority + change };
        }
        
      }
      return answer;
    });
    setAnswers({ ...answers, [questionId]: updatedAnswers });
  };
  */

  const SubmitAnswers = async () => {
    const formattedAnswers = Object.keys(answers).map((questionId) => {
      const answer = answers[parseInt(questionId)];
      if (answer[0].textAnswer === false) {
        return { question_id: parseInt(questionId), answer_ids: answer.map((ans) => ans.id) };
      } else {
        return { question_id: parseInt(questionId), textAnswer: answer[0].answer_content || '' };
      }
    });

    try {
      const temp = { quizId: parseInt(quizId || "0"), answers: formattedAnswers};
      console.log(JSON.stringify(temp)); 
      const { data } = await client.query({
        query: CHECK_ANSWERS,
        variables: temp
      });

      console.log(JSON.stringify(data)); // Wyświetlenie odpowiedzi z serwera
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };
  

  if (questionsLoading) return <p>Loading...</p>;
  if (questionsError) return <p>Error: {questionsError.message}</p>;

  return (
    <Container maxWidth="md">
      {questionsData?.findFullQuestions.map((question) => (
        <Paper key={question.id} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6">{question.question_content}</Typography>
          <FormControl component="fieldset" style={{ marginTop: '10px' }}>
            {question.question_type === 'TYPE_1' && (
              <RadioGroup value={answers[question.id]} onChange={(e) => handleSingleChoiceChange(question.id, e.target.value)}>
                {question.answers.map((answer) => (
                  <FormControlLabel key={answer.id} value={answer.id.toString()} control={<Radio />} label={answer.answer_content} />
                ))}
              </RadioGroup>
            )}
            {question.question_type === 'TYPE_2' && (
    <FormGroup>
        {question.answers.map((answer) => {
            const isChecked = answers[question.id]?.some(a => a.id === answer.id);
            return (
                <FormControlLabel
                    key={answer.id}
                    control={
                        <Checkbox
                            checked={isChecked}
                            onChange={() => handleMultipleChoiceChange(question.id, answer.id.toString())}
                        />
                    }
                    label={answer.answer_content}
                />
            );
        })}
    </FormGroup>
)}

            {/* {question.question_type === 'TYPE_3' && (
              <FormControl>
                <FormLabel>Sortuj odpowiedzi:</FormLabel>
                {answers[question.id]?.map((answer, index) => (
                  <div key={answer.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <IconButton disabled={index === 0} onClick={() => handlePriorityChange(question.id, answer.id, -1)}>
                      <DragHandle />
                    </IconButton>
                    <Typography>{answer.answer_content}</Typography>
                    <IconButton disabled={index === answers[question.id].length - 1} onClick={() => handlePriorityChange(question.id, answer.id, 1)}>
                      <DragHandle style={{ transform: 'rotate(180deg)' }} />
                    </IconButton>
                  </div>
                ))}
              </FormControl>
            )} */}
            
            {question.question_type === 'TYPE_4' && (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Odpowiedź"
                value={(answers[question.id] && answers[question.id][0].answer_content) || ''}
                onChange={(e) => handleTextAnswerChange(question.id, e.target.value)}
              />
            )}
          </FormControl>
        </Paper>
      ))}
      <Button variant="contained" color="primary" onClick={SubmitAnswers}>
        Wyślij Odpowiedzi
      </Button>
    </Container>
  );
};

export default QuizQuestionsPage;