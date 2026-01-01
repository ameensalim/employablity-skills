import { useState } from "react";
import { CheckCircle2, Lightbulb, PlayCircle, BookOpen, X, CheckCircle, XCircle, ChevronRight, Trophy } from "lucide-react";
import { questions1, questions } from "./questions";

function Show() {
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizSet, setQuizSet] = useState<'set1' | 'set2'>('set1');
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestions = quizSet === 'set1' ? questions1 : questions;
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const startQuiz = (set: 'set1' | 'set2') => {
    setQuizSet(set);
    setQuizMode(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAnswerClick = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const exitQuiz = () => {
    setQuizMode(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          <Trophy className="w-20 h-20 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Quiz Complete!</h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <p className="text-5xl font-bold text-blue-600 mb-2">
              {score}/{currentQuestions.length}
            </p>
            <p className="text-slate-600 text-lg">
              {Math.round((score / currentQuestions.length) * 100)}% Correct
            </p>
          </div>
          <button
            onClick={exitQuiz}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Study Mode
          </button>
        </div>
      </div>
    );
  }

  if (quizMode) {
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
        {/* Quiz Header */}
        <div className="bg-white shadow-md border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={exitQuiz}
                className="text-slate-600 hover:text-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div>
                <p className="text-sm text-slate-500 font-medium">Question {currentQuestionIndex + 1} of {currentQuestions.length}</p>
                <div className="w-48 h-2 bg-slate-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                    style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-xl">
              <Trophy className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-emerald-700 text-lg">{score}/{currentQuestions.length}</span>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8">
            {/* Question Number Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                {currentQuestion.num}
              </div>
              <h2 className="text-2xl font-bold text-slate-800 leading-relaxed flex-1">
                {currentQuestion.q}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.opts.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                const isCorrectAnswer = opt === currentQuestion.answer;
                
                let bgColor = "bg-slate-50 hover:bg-slate-100 border-slate-300";
                let textColor = "text-slate-700";
                
                if (showResult) {
                  if (isCorrectAnswer) {
                    bgColor = "bg-emerald-50 border-emerald-400";
                    textColor = "text-emerald-800";
                  } else if (isSelected && !isCorrect) {
                    bgColor = "bg-red-50 border-red-400";
                    textColor = "text-red-800";
                  }
                } else if (isSelected) {
                  bgColor = "bg-blue-50 border-blue-400";
                  textColor = "text-blue-800";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerClick(opt)}
                    disabled={showResult}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-base ${bgColor} ${textColor} ${!showResult && 'hover:shadow-md cursor-pointer'} ${showResult && 'cursor-not-allowed'} flex items-center justify-between`}
                  >
                    <span>{opt}</span>
                    {showResult && isCorrectAnswer && (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result & Method */}
            {showResult && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {/* Result Badge */}
                <div className={`rounded-xl p-4 ${isCorrect ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <span className={`font-bold text-lg ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                </div>

                {/* Method */}
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-4">
                  <div className="flex gap-3 items-start">
                    <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-900 mb-2">Solution:</h4>
                      <p className="text-amber-800 leading-relaxed">{currentQuestion.method}</p>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {currentQuestionIndex < currentQuestions.length - 1 ? (
                    <>
                      Next Question
                      <ChevronRight className="w-5 h-5" />
                    </>
                  ) : (
                    'Finish Quiz'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Question Bank</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quiz Mode Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Question Set 1</h3>
                <p className="text-slate-600">Questions {questions1[0]?.num}-{questions1[questions1.length - 1]?.num}</p>
              </div>
            </div>
            <button
              onClick={() => startQuiz('set1')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Start Quiz Mode
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Question Set 2</h3>
                <p className="text-slate-600">Questions {questions[0]?.num}-{questions[questions.length - 1]?.num}</p>
              </div>
            </div>
            <button
              onClick={() => startQuiz('set2')}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Start Quiz Mode
            </button>
          </div>
        </div>

        {/* Question Set 1 */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-xl mb-5 inline-flex items-center gap-2 shadow-md">
            <h2 className="text-xl font-bold">
              Set 1 (Q{questions1[0]?.num}-{questions1[questions1.length - 1]?.num})
            </h2>
          </div>

          <div className="space-y-5">
            {questions1.map((question) => (
              <div
                key={question.num}
                className="bg-white rounded-xl shadow-md border border-slate-200 p-5 break-inside-avoid hover:shadow-lg transition-shadow"
              >
                {/* Question */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                    {question.num}
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 leading-relaxed">
                    {question.q}
                  </h3>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 ml-13 text-sm">
                  {question.opts.map((opt, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                {/* Method & Answer */}
                <div className="ml-13 space-y-3">
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-4 py-3">
                    <div className="flex gap-2 items-start">
                      <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-900">
                        <span className="font-semibold">Method:</span>{" "}
                        {question.method}
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg px-4 py-3">
                    <div className="flex gap-2 items-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <p className="text-sm text-emerald-900">
                        <span className="font-semibold">Answer:</span>{" "}
                        <span className="font-bold">{question.answer}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Set 2 */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl mb-5 inline-flex items-center gap-2 shadow-md">
            <h2 className="text-xl font-bold">
              Set 2 (Q{questions[0]?.num}-{questions[questions.length - 1]?.num})
            </h2>
          </div>

          <div className="space-y-5">
            {questions.map((question) => (
              <div
                key={question.num}
                className="bg-white rounded-xl shadow-md border border-slate-200 p-5 break-inside-avoid hover:shadow-lg transition-shadow"
              >
                {/* Question */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                    {question.num}
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 leading-relaxed">
                    {question.q}
                  </h3>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 ml-13 text-sm">
                  {question.opts.map((opt, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                {/* Method & Answer */}
                <div className="ml-13 space-y-3">
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-4 py-3">
                    <div className="flex gap-2 items-start">
                      <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-900">
                        <span className="font-semibold">Method:</span>{" "}
                        {question.method}
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg px-4 py-3">
                    <div className="flex gap-2 items-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <p className="text-sm text-emerald-900">
                        <span className="font-semibold">Answer:</span>{" "}
                        <span className="font-bold">{question.answer}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .break-inside-avoid { page-break-inside: avoid; }
          @page { margin: 0.5cm; }
        }
      `}</style>
    </div>
  );
}

export default Show;
