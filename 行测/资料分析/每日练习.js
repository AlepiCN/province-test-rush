const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '每日练习记录.json');

class PracticeGenerator {
  constructor() {
    this.practiceTypes = [
      '增长率相关',
      '比重相关',
      '平均量相关',
      '倍数相关',
      '简单计算',
      '综合分析'
    ];
  }

  generateGrowthRateQuestion() {
    const baseValue = Math.floor(Math.random() * 10000) + 1000;
    const growthRateOptions = [0.05, 0.08, 0.1, 0.12, 0.15, 0.2, 0.25];
    const growthRate = growthRateOptions[Math.floor(Math.random() * growthRateOptions.length)];
    const growthAmount = Math.round(baseValue * growthRate);
    const currentValue = baseValue + growthAmount;

    const questionTypes = [
      {
        type: '求增长率',
        question: `某地区2024年GDP为${baseValue}亿元，2025年为${currentValue}亿元，求2025年增长率。`,
        answer: `${(growthRate * 100).toFixed(1)}%`,
        explanation: `增长率 = (现期量 - 基期量) ÷ 基期量 = (${currentValue} - ${baseValue}) ÷ ${baseValue} = ${growthAmount} ÷ ${baseValue} ≈ ${(growthRate * 100).toFixed(1)}%`
      },
      {
        type: '求增长量',
        question: `某地区2024年GDP为${baseValue}亿元，增长率为${(growthRate * 100).toFixed(1)}%，求增长量。`,
        answer: `${growthAmount}亿元`,
        explanation: `增长量 = 基期量 × 增长率 = ${baseValue} × ${(growthRate * 100).toFixed(1)}% = ${growthAmount}亿元`
      },
      {
        type: '求基期量',
        question: `某地区2025年GDP为${currentValue}亿元，增长率为${(growthRate * 100).toFixed(1)}%，求2024年GDP（基期量）。`,
        answer: `${baseValue}亿元`,
        explanation: `基期量 = 现期量 ÷ (1 + 增长率) = ${currentValue} ÷ (1 + ${(growthRate * 100).toFixed(1)}%) = ${currentValue} ÷ ${(1 + growthRate).toFixed(2)} ≈ ${baseValue}亿元`
      }
    ];

    return questionTypes[Math.floor(Math.random() * questionTypes.length)];
  }

  generateProportionQuestion() {
    const partValue = Math.floor(Math.random() * 5000) + 500;
    const totalValue = partValue + Math.floor(Math.random() * 10000) + 1000;
    const proportion = ((partValue / totalValue) * 100).toFixed(1);

    const questionTypes = [
      {
        type: '求比重',
        question: `某地区A产业产值为${partValue}亿元，GDP总量为${totalValue}亿元，求A产业占GDP的比重。`,
        answer: `${proportion}%`,
        explanation: `比重 = 部分 ÷ 整体 = ${partValue} ÷ ${totalValue} ≈ ${proportion}%`
      },
      {
        type: '求部分',
        question: `某地区GDP为${totalValue}亿元，A产业占GDP的比重为${proportion}%，求A产业产值。`,
        answer: `${partValue}亿元`,
        explanation: `部分 = 整体 × 比重 = ${totalValue} × ${proportion}% ≈ ${partValue}亿元`
      },
      {
        type: '求整体',
        question: `某地区A产业产值为${partValue}亿元，占GDP的比重为${proportion}%，求GDP总量。`,
        answer: `${totalValue}亿元`,
        explanation: `整体 = 部分 ÷ 比重 = ${partValue} ÷ ${proportion}% ≈ ${totalValue}亿元`
      }
    ];

    return questionTypes[Math.floor(Math.random() * questionTypes.length)];
  }

  generateAverageQuestion() {
    const totalValue = Math.floor(Math.random() * 100000) + 10000;
    const count = Math.floor(Math.random() * 100) + 10;
    const average = (totalValue / count).toFixed(2);

    const questionTypes = [
      {
        type: '求平均量',
        question: `某地区${count}家企业总产值${totalValue}万元，求平均每家企业产值。`,
        answer: `${average}万元`,
        explanation: `平均量 = 总量 ÷ 数量 = ${totalValue} ÷ ${count} ≈ ${average}万元`
      },
      {
        type: '求总量',
        question: `某地区${count}家企业平均每家产值${average}万元，求总产值。`,
        answer: `${totalValue}万元`,
        explanation: `总量 = 平均量 × 数量 = ${average} × ${count} ≈ ${totalValue}万元`
      },
      {
        type: '求数量',
        question: `某地区企业总产值${totalValue}万元，平均每家企业产值${average}万元，求企业数量。`,
        answer: `${count}家`,
        explanation: `数量 = 总量 ÷ 平均量 = ${totalValue} ÷ ${average} ≈ ${count}家`
      }
    ];

    return questionTypes[Math.floor(Math.random() * questionTypes.length)];
  }

  generateMultipleQuestion() {
    const valueA = Math.floor(Math.random() * 5000) + 1000;
    const valueB = Math.floor(Math.random() * 3000) + 500;
    const multiple = (valueA / valueB).toFixed(2);
    const moreMultiple = (valueA / valueB - 1).toFixed(2);

    const questionTypes = [
      {
        type: '求倍数',
        question: `某地区A产业产值为${valueA}亿元，B产业产值为${valueB}亿元，求A产业是B产业的几倍。`,
        answer: `${multiple}倍`,
        explanation: `倍数 = A ÷ B = ${valueA} ÷ ${valueB} ≈ ${multiple}倍`
      },
      {
        type: '求多几倍',
        question: `某地区A产业产值为${valueA}亿元，B产业产值为${valueB}亿元，求A产业比B产业多几倍。`,
        answer: `${moreMultiple}倍`,
        explanation: `多几倍 = A÷B - 1 = ${valueA} ÷ ${valueB} - 1 ≈ ${moreMultiple}倍`
      }
    ];

    return questionTypes[Math.floor(Math.random() * questionTypes.length)];
  }

  generateSimpleCalculationQuestion() {
    const num1 = Math.floor(Math.random() * 1000) + 100;
    const num2 = Math.floor(Math.random() * 1000) + 100;
    const num3 = Math.floor(Math.random() * 1000) + 100;

    const operations = [
      {
        type: '加法',
        question: `计算：${num1} + ${num2} = ?`,
        answer: `${num1 + num2}`,
        explanation: `${num1} + ${num2} = ${num1 + num2}`
      },
      {
        type: '减法',
        question: `计算：${num1} - ${num2} = ?`,
        answer: `${num1 - num2}`,
        explanation: `${num1} - ${num2} = ${num1 - num2}`
      },
      {
        type: '加法组合',
        question: `计算：${num1} + ${num2} + ${num3} = ?`,
        answer: `${num1 + num2 + num3}`,
        explanation: `${num1} + ${num2} + ${num3} = ${num1 + num2 + num3}`
      }
    ];

    return operations[Math.floor(Math.random() * operations.length)];
  }

  generateComprehensiveQuestion() {
    const baseValue = Math.floor(Math.random() * 5000) + 1000;
    const growthRate = 0.1 + Math.random() * 0.1;
    const growthAmount = Math.round(baseValue * growthRate);
    const currentValue = baseValue + growthAmount;
    const partValue = Math.floor(currentValue * 0.3);
    const proportion = ((partValue / currentValue) * 100).toFixed(1);

    const options = [
      `2024年GDP为${baseValue}亿元`,
      `增长量为${growthAmount}亿元`,
      `A产业占GDP比重为${proportion}%`,
      `A产业产值为${partValue}亿元`
    ];

    const correctIndex = Math.floor(Math.random() * 4);
    const correctOption = options[correctIndex];

    const statements = [
      { text: `2024年GDP为${baseValue}亿元`, correct: correctIndex === 0 },
      { text: `增长量为${growthAmount}亿元`, correct: correctIndex === 1 },
      { text: `A产业占GDP比重为${proportion}%`, correct: correctIndex === 2 },
      { text: `A产业产值为${partValue}亿元`, correct: correctIndex === 3 }
    ];

    return {
      type: '综合分析',
      question: `某地区2024年GDP为${baseValue}亿元，2025年为${currentValue}亿元，增长率为${(growthRate * 100).toFixed(1)}%。A产业2025年产值为${partValue}亿元。以下说法正确的是：`,
      options: statements,
      answer: statements[correctIndex].text,
      explanation: `根据题目数据计算，${statements[correctIndex].text}是正确的。`
    };
  }

  generatePractice(count = 10) {
    const questions = [];
    const typeCount = Math.floor(count / this.practiceTypes.length);
    const remainder = count % this.practiceTypes.length;

    for (let i = 0; i < this.practiceTypes.length; i++) {
      const questionCount = i < remainder ? typeCount + 1 : typeCount;
      for (let j = 0; j < questionCount; j++) {
        let question;
        switch (this.practiceTypes[i]) {
          case '增长率相关':
            question = this.generateGrowthRateQuestion();
            break;
          case '比重相关':
            question = this.generateProportionQuestion();
            break;
          case '平均量相关':
            question = this.generateAverageQuestion();
            break;
          case '倍数相关':
            question = this.generateMultipleQuestion();
            break;
          case '简单计算':
            question = this.generateSimpleCalculationQuestion();
            break;
          case '综合分析':
            question = this.generateComprehensiveQuestion();
            break;
        }
        questions.push({
          id: questions.length + 1,
          type: this.practiceTypes[i],
          ...question,
          yourAnswer: '',
          isCorrect: false
        });
      }
    }

    return questions;
  }

  savePractice(questions) {
    const practiceData = {
      date: new Date().toISOString().split('T')[0],
      questions: questions,
      correctCount: 0,
      totalCount: questions.length
    };

    let allPractices = [];
    if (fs.existsSync(dataPath)) {
      allPractices = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }

    allPractices.push(practiceData);
    fs.writeFileSync(dataPath, JSON.stringify(allPractices, null, 2), 'utf8');

    return practiceData;
  }

  getPracticeHistory() {
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  displayPractice(questions) {
    console.log('='.repeat(60));
    console.log('资料分析每日练习');
    console.log('='.repeat(60));
    console.log('');

    questions.forEach((q, index) => {
      console.log(`【题目${q.id}】${q.type}`);
      console.log(`${q.question}`);
      if (q.options) {
        q.options.forEach((opt, i) => {
          console.log(`  ${String.fromCharCode(65 + i)}. ${opt.text}`);
        });
      }
      console.log('');
    });

    console.log('='.repeat(60));
    console.log('答案与解析');
    console.log('='.repeat(60));
    console.log('');

    questions.forEach((q, index) => {
      console.log(`【题目${q.id}】`);
      console.log(`正确答案：${q.answer}`);
      console.log(`解析：${q.explanation}`);
      console.log('');
    });
  }

  displayStatistics() {
    const history = this.getPracticeHistory();
    if (history.length === 0) {
      console.log('暂无练习记录');
      return;
    }

    console.log('='.repeat(60));
    console.log('练习统计');
    console.log('='.repeat(60));
    console.log('');

    history.forEach((practice, index) => {
      const accuracy = ((practice.correctCount / practice.totalCount) * 100).toFixed(1);
      console.log(`${index + 1}. ${practice.date} - 正确率：${accuracy}% (${practice.correctCount}/${practice.totalCount})`);
    });

    console.log('');
    console.log(`总计练习：${history.length}次`);
    const totalQuestions = history.reduce((sum, p) => sum + p.totalCount, 0);
    const totalCorrect = history.reduce((sum, p) => sum + p.correctCount, 0);
    const avgAccuracy = ((totalCorrect / totalQuestions) * 100).toFixed(1);
    console.log(`总题数：${totalQuestions}题`);
    console.log(`总正确数：${totalCorrect}题`);
    console.log(`平均正确率：${avgAccuracy}%`);
  }
}

function main() {
  const generator = new PracticeGenerator();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('使用方法：');
    console.log('  node 每日练习.js generate [题目数量] - 生成练习题');
    console.log('  node 每日练习.js history - 查看练习历史');
    console.log('  node 每日练习.js stats - 查看统计信息');
    return;
  }

  const command = args[0];

  if (command === 'generate') {
    const count = args[1] ? parseInt(args[1]) : 10;
    const questions = generator.generatePractice(count);
    generator.displayPractice(questions);

    console.log('');
    console.log('是否保存本次练习？(y/n)');
    console.log('保存后可使用 "node 每日练习.js history" 查看历史记录');
  } else if (command === 'history') {
    const history = generator.getPracticeHistory();
    if (history.length === 0) {
      console.log('暂无练习记录');
      return;
    }

    history.forEach((practice, index) => {
      console.log(`\n练习${index + 1} - ${practice.date}`);
      console.log('='.repeat(60));
      practice.questions.forEach((q, qIndex) => {
        console.log(`【题目${q.id}】${q.type}`);
        console.log(`${q.question}`);
        console.log(`正确答案：${q.answer}`);
        console.log(`你的答案：${q.yourAnswer || '未作答'}`);
        console.log(`是否正确：${q.isCorrect ? '✓' : '✗'}`);
        console.log('');
      });
    });
  } else if (command === 'stats') {
    generator.displayStatistics();
  } else {
    console.log('未知命令，请使用 generate、history 或 stats');
  }
}

if (require.main === module) {
  main();
}

module.exports = PracticeGenerator;
