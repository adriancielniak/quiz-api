import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container,
         Typography, 
         Paper, 
         Radio, 
         RadioGroup, 
         FormControlLabel, 
         Checkbox, 
         FormControl, 
         FormGroup, 
         TextField, 
         Button } from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { FIND_FULL_QUESTIONS, CHECK_ANSWERS } from './Static';
import { DropResult } from 'react-beautiful-dnd';
import React from 'react';
import { reorder } from './helpers';
import DraggableList from './DraggableList';

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

const QuizQuestionsPage = (): JSX.Element => {
  const client = useApolloClient();
  const { quizId } = useParams<{ quizId?: string }>(); 
  const { 
    loading: questionsLoading,
    error: questionsError, 
    data: questionsData 
  } = useQuery<FindFullQuestionsQuery>(
      FIND_FULL_QUESTIONS, 
      {variables: { quiz_id: parseInt(quizId || "0") }, }
    );

  const [answers, setAnswers] = useState<{ [questionId: number]: Answer[] }>({});

  useEffect(() => {
    if (!questionsLoading && questionsData) {
      const initialAnswers: { [questionId: number]: Answer[] } = {};
      questionsData.findFullQuestions.forEach(question => {
        if (question.question_type === 'TYPE_3' && !answers[question.id]) {
          initialAnswers[question.id] = question.answers.map(ans => ({
            id: ans.id,
            answer_content: ans.answer_content,
            textAnswer: false
          }));
        }
      });
      setAnswers(prevState => ({ ...prevState, ...initialAnswers }));
    }
  }, [questionsLoading, questionsData]);

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

      console.log(JSON.stringify(data)); 
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const onDragEnd = (result: DropResult, questionId: number) => {
    if (!result.destination) {
      return;
    }
  
    const { destination, source } = result;
    const reorderedAnswers = reorder(answers[questionId], source.index, destination.index);
    const updatedAnswers = { ...answers, [questionId]: reorderedAnswers };
    setAnswers(updatedAnswers);
  };
  

  if (questionsLoading) return <p>Loading...</p>;
  if (questionsError) return <p>Error: {questionsError.message}</p>;

  return (
    <Container maxWidth="md">
      {questionsData?.findFullQuestions.map((question) => (
        <Paper key={question.id} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6">{question.question_content}</Typography>
          <FormControl component="fieldset" style={{ marginTop: '10px' }}>

            {question.question_type === 'TYPE_1' && 
            (
              <RadioGroup value={answers[question.id]} onChange={(e) => handleSingleChoiceChange(question.id, e.target.value)}>
                {question.answers.map((answer) => (
                  <FormControlLabel key={answer.id} value={answer.id.toString()} control={<Radio />} label={answer.answer_content} />
                ))}
              </RadioGroup>
            )
            }

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

            {question.question_type === 'TYPE_3' && answers[question.id] && (
              <DraggableList
                items={answers[question.id].map(answer => ({
                  id: answer.id.toString(),
                  answer_content: answer.answer_content
                }))}
                onDragEnd={(result) => onDragEnd(result, question.id)}
              />
            )}
            

            {question.question_type === 'TYPE_4' && (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="answer"
                value={(answers[question.id] && answers[question.id][0].answer_content) || ''}
                onChange={(e) => handleTextAnswerChange(question.id, e.target.value)}
              />
            )}
          </FormControl>
        </Paper>
      ))}
      <Button variant="contained" color="primary" onClick={SubmitAnswers}>
        Send Answers
      </Button>
    </Container>
  );
};

export default QuizQuestionsPage;