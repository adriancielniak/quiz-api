import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel, List, ListItem, IconButton, Container, Typography, Paper, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useMutation } from '@apollo/client';

interface QuizInterface {
  title: string;
  questions: QuestionInterface[];
}

interface QuestionInterface {
  question_type: string;
  question_content: string;
  answers: AnswerInterface[];
}

interface AnswerInterface {
  answer_content: string;
  priority?: number;
  is_correct?: boolean;
}

const CREATE_QUIZ = gql`
mutation CreateQuiz($createQuizInput: CreateQuizInput!) {
  createQuiz(createQuizInput: $createQuizInput) {
    id
    title
    questions {
      id
      question_type
      question_content
      answers {
        id
        answer_content
        priority
        is_correct
      }
    }
  }
}
`;

const TeacherPage = () => {
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [questionContent, setQuestionContent] = useState<string>('');
  const [questionType, setQuestionType] = useState<string>('TYPE_1');
  const [answers, setAnswers] = useState<AnswerInterface[]>([]);
  const [textAnswer, setTextAnswer] = useState<string>('');

  const [createQuiz] = useMutation(CREATE_QUIZ);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question_content: questionContent, question_type: questionType, answers: answers }]);
    setQuestionContent('');
    setAnswers([]);
    setTextAnswer('');
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { answer_content: '', is_correct: false }]);
  };

  const handleAnswerChange = (index: number, content: string, is_correct?: boolean, priority?: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], answer_content: content, is_correct, priority };
    if (is_correct !== undefined && questionType === 'TYPE_1') {
      // Ensure only one correct answer for Single Choice
      newAnswers.forEach((answer, i) => {
        if (i !== index) {
          answer.is_correct = false;
        }
      });
    }
    setAnswers(newAnswers);
  };

  const handleDeleteAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmitQuiz = async () => {
    const quiz: QuizInterface = {
      title: quizTitle,
      questions: questions.map(question => ({
        ...question,
        answers: question.question_type === 'TYPE_4' ? [{ answer_content: textAnswer, is_correct: true }] : question.answers,
      })),
    };

    try {
      await createQuiz({ variables: { createQuizInput: quiz } });
      console.log('Quiz created successfully');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleQuestionTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setQuestionType(event.target.value as string);
    setAnswers([]);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create new quiz
        </Typography>

        <TextField
          label="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Typography variant="h5" gutterBottom>
          Add new questions
        </Typography>
        <TextField
          label="Question Content"
          value={questionContent}
          onChange={(e) => setQuestionContent(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Question Type</InputLabel>
          <Select
            value={questionType}
            onChange={handleQuestionTypeChange}
          >
            <MenuItem value="TYPE_1">Single Choice</MenuItem>
            <MenuItem value="TYPE_2">Multiple Choice</MenuItem>
            <MenuItem value="TYPE_3">Sorting</MenuItem>
            <MenuItem value="TYPE_4">Text Answer</MenuItem>
          </Select>
        </FormControl>

        {(questionType === 'TYPE_1' || questionType === 'TYPE_2') && (
          <div>
            <Box display="flex" justifyContent="center" marginBottom="10px">
              <Button variant="contained" color="primary" onClick={handleAddAnswer}>
                Add Answer
              </Button>
            </Box>
            <List>
              {answers.map((answer, index) => (
                <ListItem key={index}>
                  <TextField
                    label={`Answer ${index + 1}`}
                    value={answer.answer_content}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!answer.is_correct}
                        onChange={(e) => handleAnswerChange(index, answer.answer_content, e.target.checked)}
                      />
                    }
                    label="Correct"
                  />
                  <IconButton onClick={() => handleDeleteAnswer(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </div>
        )}

        {questionType === 'TYPE_3' && (
          <div>
            <Box display="flex" justifyContent="center" marginBottom="10px">
              <Button variant="contained" color="primary" onClick={handleAddAnswer}>
                Add Answer
              </Button>
            </Box>
            <List>
              {answers.map((answer, index) => (
                <ListItem key={index}>
                  <TextField
                    label={`Answer ${index + 1}`}
                    value={answer.answer_content}
                    onChange={(e) => handleAnswerChange(index, e.target.value, undefined, index + 1)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Priority"
                    type="number"
                    value={answer.priority ?? ''}
                    onChange={(e) => handleAnswerChange(index, answer.answer_content, undefined, parseInt(e.target.value))}
                    margin="normal"
                    style={{ width: '100px', marginLeft: '10px' }}
                  />
                  <IconButton onClick={() => handleDeleteAnswer(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </div>
        )}

        {questionType === 'TYPE_4' && (
          <TextField
            label="Text Answer"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}

        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            disabled={!questionContent}
          >
            Add Question
          </Button>
        </Box>

        <Typography variant="h5" style={{ marginTop: '20px' }}>
          Current Questions
        </Typography>
        <List>
          {questions.map((question, index) => (
            <ListItem key={index} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ width: '100%' }}>
                {question.question_content} ({question.question_type})
                <IconButton onClick={() => handleDeleteQuestion(index)} style={{ float: 'right' }}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <ul>
                {question.answers.map((answer, i) => (
                  <li key={i}>{answer.answer_content}</li>
                ))}
              </ul>
            </ListItem>
          ))}
        </List>

        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmitQuiz}
            disabled={!quizTitle || questions.length === 0}
          >
            Submit Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TeacherPage;
