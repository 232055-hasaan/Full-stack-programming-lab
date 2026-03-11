$(document).ready(function () {

  const questions = [
    {
      q: 'Which keyword declares a block-scoped variable in JavaScript?',
      options: ['var', 'let', 'define', 'set'],
      answer: 1
    },
    {
      q: 'What does DOM stand for?',
      options: ['Data Object Model', 'Document Object Model', 'Display Output Method', 'Dynamic Object Manager'],
      answer: 1
    },
    {
      q: 'Which jQuery method is used to hide an element?',
      options: ['.remove()', '.hide()', '.invisible()', '.collapse()'],
      answer: 1
    },
    {
      q: 'What is the correct way to select an element with id="box" in jQuery?',
      options: ['.box', '$(".box")', '$("#box")', '$[box]'],
      answer: 2
    },
    {
      q: 'Which HTTP method is typically used to fetch data in AJAX?',
      options: ['POST', 'DELETE', 'PUT', 'GET'],
      answer: 3
    },
    {
      q: 'What does === check in JavaScript?',
      options: ['Value only', 'Type only', 'Both value and type', 'Neither'],
      answer: 2
    }
  ];

  let current = 0;
  let score = 0;
  let answered = false;

  function loadQuestion() {
    answered = false;
    const q = questions[current];
    const total = questions.length;
    const progress = ((current) / total) * 100;

    $('#progressFill').css('width', progress + '%');
    $('#qNum').text('Question ' + (current + 1) + ' of ' + total);
    $('#qScore').text('Score: ' + score);
    $('#questionText').text(q.q);
    $('#nextBtn').hide();

    const $opts = $('#optionsWrap').empty();
    q.options.forEach(function (opt, i) {
      const $btn = $('<button class="option-btn"></button>').text(opt);
      $btn.on('click', function () {
        if (answered) return;
        answered = true;

        $btn.addClass(i === q.answer ? 'correct' : 'wrong');

        if (i === q.answer) {
          score++;
          $('#qScore').text('Score: ' + score);
        } else {
          // Show correct answer
          $('.option-btn').eq(q.answer).addClass('correct');
        }

        $('.option-btn').prop('disabled', true);
        $('#nextBtn').fadeIn(300);
      });
      $opts.append($btn);
    });
  }

  function showResult() {
    $('#progressFill').css('width', '100%');

    $('#questionScreen').fadeOut(300, function () {
      $('#resultScreen').fadeIn(400);
    });

    $('#scoreNum').text(score);

    let title, msg;
    if (score === 6)      { title = '🏆 Perfect Score!';   msg = 'Outstanding! You nailed every question.'; }
    else if (score >= 4)  { title = '🎉 Great Job!';        msg = 'You really know your JavaScript!'; }
    else if (score >= 2)  { title = '👍 Good Effort!';      msg = 'Keep studying — you\'re getting there.'; }
    else                  { title = '📚 Keep Learning!';    msg = 'Review the concepts and try again.'; }

    $('#resultTitle').text(title);
    $('#resultMsg').text(msg);
  }

  // Navigation
  $('#nextBtn').on('click', function () {
    current++;
    if (current < questions.length) {
      $('#questionScreen').fadeOut(200, function () {
        loadQuestion();
        $(this).fadeIn(300);
      });
    } else {
      showResult();
    }
  });

  // Start
  $('#startBtn').on('click', function () {
    $('#startScreen').fadeOut(300, function () {
      loadQuestion();
      $('#questionScreen').fadeIn(400);
    });
  });

  // Retry
  $('#retryBtn').on('click', function () {
    current = 0;
    score = 0;
    $('#resultScreen').fadeOut(300, function () {
      loadQuestion();
      $('#questionScreen').fadeIn(400);
    });
  });

});