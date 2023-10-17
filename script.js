let totalCalories = 0;
let selectedIngredients = [];
let blinkingInterval;

// 修改calculateCalories函数，传入配料名字
function calculateCalories(calories, ingredientName) {
    totalCalories += calories;
    if (ingredientName == '花生','紅豆','綠豆','大紅豆','芋頭','愛玉','麥片','薏仁','仙草','椰果','粉圓','芋圓','湯圓','QQ圓','粉粿','煉乳') {
      selectedIngredients.push({ name:ingredientName , calories:calories });
    }
    if (selectedIngredients.length === 3) {
      const totalCaloriesDisplay = document.getElementById('totalCaloriesDisplay');
      totalCaloriesDisplay.scrollIntoView({ behavior: 'smooth' });
    }
    updateTotalCaloriesDisplay();
    updateSelectedIngredientsDisplay(); // 更新選擇的配料顯示
    updateSelectedDetails(ingredientName, calories);
}

function updateSelectedIngredientsDisplay() {
    const selectedIngredientsDisplay = document.getElementById('selectedIngredients');
    selectedIngredientsDisplay.innerHTML = '選擇的配料：';
    for (const ingredient of selectedIngredients) {
      selectedIngredientsDisplay.innerHTML += `${ingredient.name} `;
    }
}

function undoLastIngredient() {
  if (selectedIngredients.length > 0) {
    const lastIngredient = selectedIngredients.pop();
    totalCalories -= lastIngredient.calories;
    updateSelectedIngredientsDisplay();
    updateTotalCaloriesDisplay();
  }
}

function resetTotal() {
    scrollToTop();
    totalCalories = 0;
    selectedIngredients = [];
    updateTotalCaloriesDisplay();
    updateSelectedIngredientsDisplay();
    // 清空豆花種類顯示
    const selectedDetails = document.getElementById('selectedDetails');
    selectedDetails.innerHTML = '';  // 清空豆花種類顯示
}

function updateTotalCaloriesDisplay() {
    const caloriesDisplay = document.getElementById('totalCaloriesDisplay');
    caloriesDisplay.innerHTML = `總熱量：<span id="caloriesValue">${totalCalories}</span> 大卡`;
    const caloriesValue = document.getElementById('caloriesValue');

    // 判斷熱量範圍並為元素添加適當的 class
    if (totalCalories >= 800) {
      caloriesValue.classList.remove('green', 'blue', 'light-red');
      caloriesValue.classList.add('red', 'blinking');
      startBlinking(); // 開始閃爍
    } else if (totalCalories >= 500 && totalCalories < 800) {
      caloriesValue.classList.remove('red', 'green', 'blinking');
      caloriesValue.classList.add('blue', 'blinking');
    } else if (totalCalories >= 300 && totalCalories < 500) {
      caloriesValue.classList.remove('red', 'blue', 'blinking');
      caloriesValue.classList.add('green', 'blinking');
    } else {
      caloriesValue.classList.remove('green', 'blue', 'red', 'blinking', 'light-red');
    }
}

function startBlinking() {
  blinkingInterval = setInterval(function() {
    const caloriesValue = document.getElementById('caloriesValue');
    caloriesValue.classList.toggle('light-red');
  }, 300); // 控制閃爍的速度
}

function displaySelection(selectedIngredientName, calories, event) {
  event.preventDefault();
  event.stopPropagation(); // 阻止事件冒泡
  const selectedDetails = document.getElementById('selectedDetails');
  selectedDetails.innerHTML = `豆花種類：${selectedIngredientName} - ${calories} 大卡`;
  totalCalories = calories;
  document.getElementById('dropdownContentHot').style.display = 'none';
  document.getElementById('dropdownContentCold').style.display = 'none';
  const ingredientsSection = document.getElementById('ingredientsSection');
  ingredientsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  updateTotalCaloriesDisplay();
}

function toggleDropdown(contentId) {
  // 切換下拉式選單的顯示與隱藏
  const content = document.getElementById(contentId);
  content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

function scrollToTop() {
  // 滚动到页面顶部，采用平滑滚动
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}



