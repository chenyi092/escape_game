    // 場景編號，初始為 1
    let currentScene = 4;
    // 場景總數
    const totalScenes = 4;
    // 記錄當前時鐘的圖片索引
    let currentClockIndex = 0; 
    // 密碼是否正確
    let isPasswordCorrect = false; 
    // 是否已領取道具
    let hasCollectedItem = false;
    // 追蹤當前選中的道具
    let currentSelectedItem = null;
    // 放大圖是否顯示中
    let isZoomActive = false; 
    //寶箱密碼是否正確
    let isTreasurePasswordCorrect = false;
    // 密碼輸入介面是否顯示中
    let isPasswordInputActive = false; 
    // 電腦是否已解鎖
    let isComputerUnlocked = false; 
    // 表示是否正在播放旁白
    let isNarrationActive = false; 
    // 初始為 false，表示尚未拿取
    hasTakenHiddenKey = false; 
    const clockImages = [
      'scene1/3clock.png', // 三點鐘
      'scene1/6clock.png', // 六點鐘
      'scene1/9clock.png', // 九點鐘
      'scene1/12clock.png' // 十二點鐘
    ];

    // 場景資料
const scenes = [
    {
      id: 1,
      elements: [
        { src: clockImages[0], x: 210, y: 40, message: ' この時計なんか変だ'},
        { id: 'door', src: 'scene1/door.png', x: 300, y: 220, zIndex: 1, message: '鍵がかかっているようだ',
          hotspots: [ // 定義虛擬區塊
            {
              id: 'door-hotspot',
              x: 65, // 相對於 door 圖片的左上角
              y: 140, 
              width: 70, 
              height: 80,
              message: '何も届いていない'
            }
          ]
        },
        { src: 'scene1/flower.png', x: 140, y: 305, message: '花瓶に何か書いてある',
          zoomSrc: 'scene1/flower_big.png' // 放大圖片路徑
         },
        { src: 'scene1/table.png', x: 0, y: 356, zIndex: 0},
        { id: 'tellphone',src: 'scene1/tellphone.png', x: 70, y: 301,
          action: 'showPasswordInput', // 呼叫密碼輸入界面
          state: 'unused', // 初始狀態
         }
      ]
    },
    {
      id: 2,
      elements: [
        { src: 'scene2/book.png', x: 60, y: 240, zIndex: 1, message: '本がいっぱいある',
          id: 'book', // 書本的唯一 ID
          state: 'initial', // 初始狀態
          zoomSrc: 'scene2/memo.png'
        },
        { src: 'scene2/floor.png', x: 0, y: 480},
        { src: 'scene2/rome3.png', x: 400, y: 150, message: 'これは...ローマ数字？なぜここに数字が書いてあるんだ？' },
        { src: 'scene2/shelf.png', x: 50, y: 230,
          zoomSrc: 'scene2/schedule.png', // 放大圖片路徑
          hotspots: [ // 定義虛擬區塊
            {
              x: 10, 
              y: 175, 
              width: 400, 
              height: 55,
              message: '今日のスケジュールだ'
            }
          ]
         },
        { id: 'treasure', src: 'scene2/treasure.png', x: 220, y: 325,
          action: 'showTreasurePasswordInput', // 呼叫新的密碼輸入函式
          state: 'full'
         },
        { id: 'window', src: 'scene2/window.png', x: 95, y: 30, message: 'ここから飛び降りるのは危険すぎる...' }
      ]
    },
    {
      id: 3,
      elements: [
        { src: 'scene3/cabinet.png', x: 90, y: 347, zIndex: 1, message: '鍵がかかっているようだ',
          id: 'cabinet', // 唯一 ID
          state: 'locked', // 初始狀態為上鎖
          zoomSrc: 'scene3/cabinet_open.png' // 放大圖片路徑
        },
        { src: 'scene3/candy.png', x: 70, y: 50, message: 'キャンディケインだ！おいしそう！' },
        { src: 'scene3/gift.png', x: 220, y: 50, message: 'プレゼントがいっぱい！いいな〜' },
        { id: 'computer', src: 'scene3/pc.png', x: 280, y: 215, message: '電源が入ってない',
          state: 'off'
         },
        { src: 'scene3/socks.png', x: 370, y: 50, message: 'かわいい〜クリスマスソックスだ！'},
        { src: 'scene3/table.png', x: 0, y: 310 },
        { id: 'extension', src: 'scene3/plug.png', x: 235, y: 341, zIndex: 2, message: 'コンセントがギリギリ届かない...' ,
          name: 'plug',
          state: 'off' // 初始狀態為 off
         },
        { src: 'scene3/pen.png', x: 170, y: 253, zIndex: 2, message: 'ペンの並び方変だな...いつも短い順で並んでるのに',
          zoomSrc: 'scene3/pen_big.png' // 放大圖片路徑
          },
        { id: 'basement', src: 'scene3/basement.png', x: 350, y: 500,message: '地下室の扉だけど鍵が掛かっている'}
      ]
    },
    {
      id: 4,
      elements: [
        { src: 'scene4/air.png', x: 50, y: 50, message: 'あれ？そういえばリモコンどこいった？',
          id: 'airConditioner', // 唯一標識
          name: 'airConditioner',
          state: 'off' // 初始狀態
         },
        { src: 'scene4/bed.png', x: 0, y: 260,
          hotspots: [ // 定義虛擬區塊
            {
              x: 270, 
              y: 55, 
              width: 180, 
              height: 100,
              message: 'とても寝心地がいい...寝坊したの絶対ベッドせいだ'
            }
          ]
         },
        { src: 'scene4/drawer.png', x: 190, y: 422, message: '鍵がかかっているようだ',
          id: 'drawer', // 唯一標識
          name: 'drawer',
          state: 'locked' // 初始狀態
         },
        { src: 'scene4/ice.png', x: 350, y: 480, 
          id: 'hiddenKey', // 唯一標識
          name: 'hiddenKey',
          state: 'show' // 初始狀態
         },
        { src: 'scene4/lamp.png', x: 30, y: 305, action: 'toggleClock'},
        { src: 'scene4/pillow.png', x: 195, y: 290, message: 'ん？何かな挟んでる',
          zoomSrc: 'scene4/rome5.png' // 放大圖片路徑
         }
      ]
    }
  ];


  // 切換場景函式
function changeScene(direction) {
  if (isNarrationActive) return; // 如果旁白正在進行，禁止切換場景
  // 更新場景編號
  currentScene += direction;

  // 循環處理場景編號
  if (currentScene > totalScenes) {
    currentScene = 1; // 從場景 4 切回場景 1
  } else if (currentScene < 1) {
    currentScene = totalScenes; // 從場景 1 切回場景 4
  }
  // 渲染對應場景
  renderScene(currentScene);
}

function showZoomWithMessage(zoomSrc, message) {
  const sceneBox = document.getElementById("scene-box");

  isZoomActive = true; // 標記放大圖顯示中

  // 如果已存在放大圖片或文字方塊，先移除
  const existingOverlay = document.getElementById("overlay");
  const existingZoom = document.getElementById("zoom-image");
  const existingMessage = document.getElementById("message-box");
  if (existingOverlay) existingOverlay.remove();
  if (existingZoom) existingZoom.remove();
  if (existingMessage) existingMessage.remove();

  // 創建黑色背景遮罩
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.className = "overlay"; // 添加 class，而非設置內聯樣式
  sceneBox.appendChild(overlay);

  // 創建放大圖片
  const zoomImage = document.createElement("img");
  zoomImage.id = "zoom-image";
  zoomImage.src = zoomSrc;
  zoomImage.alt = "放大圖片";
  zoomImage.className = "zoom-image"; // 套用通用的 CSS 樣式
  sceneBox.appendChild(zoomImage);

  // 創建文字方塊
  const messageBox = document.createElement("div");
  messageBox.id = "message-box";
  messageBox.textContent = message;
  messageBox.className = "message-box"; // 套用通用的 CSS 樣式
  sceneBox.appendChild(messageBox);

  // 創建關閉按鈕
  const closeButton = document.createElement("button");
  closeButton.id = "close-button";
  closeButton.textContent = "閉じる";
  closeButton.className = "close-button"; // 套用通用的 CSS 樣式
  sceneBox.appendChild(closeButton);

  // 綁定關閉按鈕的事件
  closeButton.addEventListener("click", () => {
    overlay.remove();
    zoomImage.remove();
    messageBox.remove();
    closeButton.remove();
    isZoomActive = false; // 恢復其他操作
  });
}

// 渲染場景函式
function renderScene(sceneId) {
  const sceneData = scenes.find(scene => scene.id === sceneId); // 找到對應場景資料
  const sceneBox = document.getElementById('scene-box'); // 場景容器

  // 清空場景容器
  sceneBox.innerHTML = '';

  // 遍歷場景中的元素並生成 DOM
  sceneData.elements.forEach(element => {
    const img = document.createElement('img');

    // 根據狀態設定圖片
    if (element.id === 'extension' && element.state === 'on') {
      img.src = 'scene3/plug_in.png'; // 使用已更新的圖片
    } else if (element.id === 'computer' && element.state === 'on') {
      img.src = 'scene3/pc_on.png'; // 電腦開啟時的圖片
    } 
    else {
      img.src = element.src; // 預設圖片
    }

        // 在渲染場景函式內處理圖片和狀態同步
    if (element.name === 'airConditioner') {
      if (element.state === 'on') {
        img.src = 'scene4/air_wind.png';
        element.message = '暖房暖かいな〜';
      } else {
        img.src = element.src; // 預設圖片
      }
    }


    // 特例處理 hiddenKey
    if (element.id === 'hiddenKey') {
      handleHiddenKeyRender(element, img);
    } 

    img.alt = '場景圖片';
    img.style.position = 'absolute';
    img.style.left = `${element.x}px`;
    img.style.top = `${element.y}px`;
    img.style.zIndex = element.zIndex; // 設定圖層順序

  // 為特定物件添加互動事件（延長線）
  if (element.name === 'plug') {
    img.addEventListener('click', () => {
      if (currentSelectedItem) {
        const selectedItemName = currentSelectedItem.dataset.name;
        const itemSlot = currentSelectedItem.parentElement; // 找到道具所在的格子
        if (selectedItemName === '延長コード' && element.state === 'off') { // 判斷選中的道具名稱
          element.state = 'on'; // 更新圖片狀態
          element.message = 'パソコンの電源がついた'; // 更新文字訊息

          // 同步更新電腦狀態
          const computerElement = scenes[2].elements.find(e => e.id === 'computer');
          if (computerElement) {
            computerElement.state = 'on'; // 更新電腦狀態
            computerElement.message = 'パソコンの電源がついた'; // 更新電腦的文字訊息
          }

           // 直接更新電腦的 DOM 圖片和點擊行為
          const computerImg = document.querySelector(`img[src="${computerElement.src}"]`);
          if (computerImg) {
            computerImg.src = 'scene3/pc_on.png'; // 更新電腦圖片
            computerImg.onclick = () => {
              showComputerPasswordInput('scene3/screen_big.png');
            };
          }

          img.src = 'scene3/plug_in.png'; // 替換成新的圖片
          if (currentSelectedItem) {
            removeItemFromSlot(currentSelectedItem); // 刪除道具圖片，保留格子
            currentSelectedItem = null; // 清空選中道具
          }
        } else if(element.state === 'on'){
          showMessageBox('パソコンの電源がついた');
        }
      } 
    });
  }

  // 為特定物件添加互動事件（空調）
if (element.name === 'airConditioner') {
  img.addEventListener('click', () => {
    if (currentSelectedItem) {
      const selectedItemName = currentSelectedItem.dataset.name;

      if (selectedItemName === 'リモコン' && element.state === 'off') { // 判斷選中的道具名稱
        element.state = 'on'; // 更新空調狀態
        element.message = '暖房暖かいな〜'; // 更新文字訊息
        img.src = 'scene4/air_wind.png'; // 更換空調圖片

        // 移除遙控器道具
        if (currentSelectedItem) {
          removeItemFromSlot(currentSelectedItem); // 刪除道具圖片，保留格子
          currentSelectedItem = null; // 清空選中道具
        }

        // 更新另一圖片的狀態和圖片
        const keyElement = scenes[3].elements.find(e => e.id === 'hiddenKey');
        if (keyElement) {
          const keyImg = document.querySelector(`img[src="scene4/ice.png"]`) || document.querySelector(`img[src="scene4/key1_small.png"]`);
          if (keyImg) {
            handleHiddenKeyRender(keyElement, keyImg);
          }
        }

      } else if (element.state === 'on') {
        showMessageBox('暖房暖かいな〜'); // 已經啟動的狀態
      }
    } else {
      // 預設顯示的文字方塊
      showMessageBox(element.message);
    }
  });
}

if (element.id === 'drawer') {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    if (element.state === 'locked' && currentSelectedItem && currentSelectedItem.dataset.name === '茶色い鍵') {
      // 解鎖抽屜邏輯
      element.state = 'empty';
      element.message = '何も入ってない';
      showZoomWithMessage('scene4/ladder.png', 'はしごを手に入れた');
      addItemToInventory('scene4/ladder.png', 'はしご');
      console.log("Before removing item:", currentSelectedItem);
        if (currentSelectedItem) {
          removeItemFromSlot(currentSelectedItem);
          currentSelectedItem = null;
        } else {
          console.error("currentSelectedItem is null at this point!");
        }
    } else if (element.state === 'empty') {
      showMessageBox(element.message); // 顯示抽屜為空訊息
    } else {
      showMessageBox('鍵がかかっているようだ'); // 預設鎖住訊息
    }
  });
}else if (element.id === 'computer') {
  img.addEventListener('click', () => {
    if (element.state === 'on' && !isComputerUnlocked) {
      showComputerPasswordInput('scene3/screen_big.png');
    } else if (isComputerUnlocked) {
      showZoomWithMessage('scene3/screen_big.png', 'パソコンが起動しました');
    } else {
      showMessageBox(element.message);
    }
  });
} 
else if (isNarrationActive) return; // 如果旁白正在進行，禁止互動

else if (element.message && element.id !== 'hiddenKey') {
  // 確保僅在沒有其他特殊條件時才執行這段邏輯
  img.addEventListener('click', () => {
    showMessageBox(element.message); // 顯示文字方塊
  });
}


img.addEventListener('click', () => {
  if (element.id === 'cabinet') {
    handleLockedObjectInteraction(element);
    console.log(element.state);
  }
});

img.addEventListener('click', () => {
  const airConditionerElement = scenes[3].elements.find(e => e.name === 'airConditioner');
  if (element.id === 'hiddenKey' && airConditionerElement.state!='on') {
    handleHiddenKeyRender(element, img);
    showMessageBox(element.message);
    console.log(element.message);
  }
});


if (element.id === 'window') {
  img.addEventListener('click', () => {
    if (currentSelectedItem && currentSelectedItem.dataset.name === 'はしご') {
      // 顯示成功訊息並跳出 overlay
      showMessageBox('はしごを使って窓から脱出成功');
      showOverlayWithMenu("Congratulations!", true);
      if (currentSelectedItem) {
        removeItemFromSlot(currentSelectedItem); // 刪除道具圖片，保留格子
        currentSelectedItem = null; // 清空選中道具
      }
    } else {
      // 顯示預設訊息
      showMessageBox(element.message);
    }
  });
}   

if (element.id === 'door') {
  img.addEventListener('click', () => {
    if (currentSelectedItem && currentSelectedItem.dataset.name === '茶色い鍵') {
      // 判斷時鐘圖片是否為 clockImages[2]
      if (scenes[0].elements[0].src === clockImages[2]) {
        // 如果時鐘符合條件，顯示成功 overlay
        showMessageBox('9時に間に合って脱出成功');
        showOverlayWithMenu("Congratulations!", true);
      } else {
        // 如果時鐘不符合條件，更新文字方塊內容
        showMessageBox('あれ？鍵はあってるはずだがなぜ空かないのだろう');
      }
    } else {
      // 未選中正確的道具，顯示門上鎖的預設訊息
      showMessageBox(element.message);
    }
  });
}

if (element.id === 'basement') {
  img.addEventListener('click', () => {
    if (currentSelectedItem && currentSelectedItem.dataset.name === '茶色い鍵') {
      // 顯示 Game Over 畫面
      showMessageBox('地下の闇に飲み込まれた');
      showOverlayWithMenu("Game Over", true);
    } 
  });
}

if (element.id === 'tellphone') {
  img.style.cursor = 'pointer'; // 鼠標變為手型
  img.addEventListener('click', () => {
    if (element.state === 'unused') {
      console.log('Password input clicked!');
      showPasswordInput(element); // 顯示輸入密碼
    } else if (element.state === 'used') {
      showMessageBox(element.message); // 顯示「もう電話する時間がない！」
    }
  });
}

    // 綁定點擊事件，顯示放大圖片與文字方塊
    if (element.zoomSrc && element.message) {
      img.addEventListener("click", () => {
        // 如果物件有 state 並且狀態為 locked，顯示提示訊息而非放大圖示
        if (element.state === 'locked') {
          showMessageBox(element.message); // 顯示上鎖提示
        } else if(element.state === 'collected'){
          showMessageBox(element.message);
        }
        else if(element.state === 'initial'){
          handleBookInteraction(element, img);
        }
        else {
          // 否則顯示放大圖示（適用於解鎖物件或其他普通物件）
          showZoomWithMessage(element.zoomSrc, element.message);
        }
      });
    }

    // 檢查是否有指定的 action
    if (element.action === 'toggleClock') {
      img.style.cursor = 'pointer'; // 鼠標變為手型
      img.addEventListener('click', () => {
        toggleClockImage(); // 點擊時切換時鐘圖片
      });
    }


    if (element.action === 'showTreasurePasswordInput') {
      img.style.cursor = 'pointer'; // 鼠標變為手型
      img.addEventListener('click', () => {
        if (element.state === "full") {
          showTreasurePasswordInput(); // 顯示密碼輸入介面
        } else if (element.state === "empty") {
          showMessageBox(element.message); // 顯示「何も入ってない」
        }
      });
    }

    // 添加圖片到場景容器
    sceneBox.appendChild(img);

    // 如果該物件有 hotspots，渲染虛擬區塊
    if (element.hotspots) {
      element.hotspots.forEach(hotspot => {
        const hotspotDiv = document.createElement("div");
        hotspotDiv.className = "hotspot"; // 套用通用樣式
        hotspotDiv.style.left = `${element.x + hotspot.x}px`;
        hotspotDiv.style.top = `${element.y + hotspot.y}px`;
        hotspotDiv.style.width = `${hotspot.width}px`;
        hotspotDiv.style.height = `${hotspot.height}px`;

        // 綁定虛擬區塊的點擊事件
        hotspotDiv.addEventListener("click", () => {
          // 檢查旁白狀態
          if (isNarrationActive) return; // 如果旁白正在進行，禁止互動

          // 如果是特定的虛擬區塊（例如門上的虛擬區塊）
            if (hotspot.id === 'door-hotspot') {
              if (isPasswordCorrect && !hasCollectedItem) {
                showZoomWithMessage("scene1/code.png", "延長コードを手に入れた");
                addItemToInventory("scene1/code.png", "延長コード"); // 添加到道具欄
                hasCollectedItem = true; // 更新狀態
              } else if (isPasswordInputActive) {
                return; // 如果密碼輸入介面正在顯示，直接返回
              } else if (!isPasswordCorrect || hasCollectedItem) {
                showMessageBox(hotspot.message); // 顯示預設的文字訊息
              }
              return; // 確保僅執行一次操作
            }
            // 處理其他虛擬區塊
              if (element.zoomSrc) {
                showZoomWithMessage(element.zoomSrc, hotspot.message || ""); // 顯示放大圖示
              } else {
                showMessageBox(hotspot.message || ""); // 顯示文字訊息
              }
        });

        // 添加虛擬區塊到場景容器
        sceneBox.appendChild(hotspotDiv);
      });
    }
  });
}

// 初始化頁面時渲染第一個場景
document.addEventListener('DOMContentLoaded', () => {
  renderScene(currentScene);
});


function handleHiddenKeyRender(element, img) {
   // 檢查空調狀態
   const airConditionerElement = scenes[3].elements.find(e => e.name === 'airConditioner');

   if (airConditionerElement && airConditionerElement.state === 'on') {
    // 空調已開啟且未拿取鑰匙
    if (!hasTakenHiddenKey) {
      img.src = 'scene4/key1_small.png'; // 顯示小鑰匙圖片
      element.message = '鍵を手に入れた'; // 更新訊息

      // 清除所有現有事件，避免多次綁定
      img.onclick = null;

      img.addEventListener('click', () => {
        if (isZoomActive) return; // 如果放大圖示已顯示，防止重複操作

        hasTakenHiddenKey = true; // 標記為已拿取
        showZoomWithMessage('scene4/key1.png', '鍵を手に入れた'); // 顯示放大圖示
        addItemToInventory("scene4/key1.png", "黄色い鍵"); // 添加到道具欄
        img.remove(); // 移除圖片
      });
    } else {
      img.style.display = 'none'; // 已拿取鑰匙，隱藏圖片
    }
  } else {
    // 空調未開啟，顯示冰塊狀態
    img.src = 'scene4/ice.png';
    element.message = '鍵が凍って取れない...';
  }
}

// 獲得道具函式
function addItemToInventory(imageSrc, name) {
  // 找到一個空的道具格子
  const emptySlot = document.querySelector('.item-slot:not(:has(img))');
  
  if (emptySlot) {
    // 重置當前選中的道具（避免多個選中）
    if (currentSelectedItem) {
      currentSelectedItem.classList.remove("selected");
      currentSelectedItem.dataset.clickState = 0;
      currentSelectedItem = null;
    }

    // 創建一個道具圖片並加入到格子中
    const item = document.createElement('img');
    item.src = imageSrc;
    item.alt = name;
    emptySlot.dataset.name = name; // 將名稱存儲在格子中
    emptySlot.appendChild(item);

    // 重新設置事件
    setupInventoryEvents();

  } else {
    alert('道具欄已滿！');
  }
}


function toggleClockImage() {
  // 更新時鐘圖片索引
  currentClockIndex = (currentClockIndex + 1) % clockImages.length;

  // 直接更新場景一中時鐘的圖片
  scenes[0].elements[0].src = clockImages[currentClockIndex];

  // 顯示文字方塊
  showMessageBox("遠くから機械の回る音がする...");
}

function showMessageBox(message) {
  const sceneBox = document.getElementById("scene-box");

  // 如果已存在文字方塊，先移除
  const existingBox = document.getElementById("message-box");
  if (existingBox) {
    existingBox.remove();
  }

  // 創建文字方塊
  const messageBox = document.createElement("div");
  messageBox.id = "message-box";
  messageBox.textContent = message;
  messageBox.className = "message-box"; // 套用通用的 CSS 樣式
  // 添加到場景容器
  sceneBox.appendChild(messageBox);

  // 點擊文字方塊後移除
  messageBox.addEventListener("click", () => {
    messageBox.remove();
  });

}


function showPasswordInput(element) {
  const gameContainer = document.getElementById("scene-box");

  // 創建背景遮罩
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.id = "overlay";
  gameContainer.appendChild(overlay);

  // 創建文字方塊
  const messageBox = document.createElement("div");
  messageBox.className = "message-box";
  messageBox.id = "message-box";
  messageBox.textContent = "五桁の番号を入力しなければいけないようだ";
  gameContainer.appendChild(messageBox);

  // 創建密碼輸入區域
  const passwordInput = document.createElement("div");
  passwordInput.className = "password-input";
  overlay.appendChild(passwordInput);

  // 初始化密碼方塊
  const password = [0, 0, 0, 0, 0];
  const correctPassword = [5, 8, 4, 9, 3];
  password.forEach((num, index) => {
    const box = document.createElement("div");
    box.className = "password-box";
    box.textContent = num;
    box.addEventListener("click", () => {
      password[index] = (password[index] + 1) % 10; // 循環加1
      box.textContent = password[index];
    });
    passwordInput.appendChild(box);
  });

  // 創建送出按鈕
  const submitButton = document.createElement("button");
  submitButton.className = "submit-button";
  submitButton.addEventListener("click", () => {
    if (password.join("") === correctPassword.join("")) {
      messageBox.textContent = "ん？何か物が届いた音がする";
      isPasswordCorrect = true; // 更新狀態

      // 更新電話狀態
      element.state = 'used';
      element.message = 'もう電話する時間がない！';
    } else {
      messageBox.textContent = "番号が違うようだ";
    }
  });
  overlay.appendChild(submitButton);

  // 創建關閉按鈕
  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.textContent = "閉じる";
  closeButton.addEventListener("click", () => {
    overlay.remove();
    messageBox.remove();
  });
  overlay.appendChild(closeButton);
}

// 為道具欄格子設置點擊事件
function setupInventoryEvents() {
  const slots = document.querySelectorAll(".item-slot");

  slots.forEach(slot => {
    // 初始化 clickState 為 0
    slot.dataset.clickState = 0;

    // 確保舊事件已移除
    const newSlot = slot.cloneNode(true);
    //newSlot.className = slot.className; // 繼承原有類名
    slot.replaceWith(newSlot);

    const itemImage = newSlot.querySelector("img");
    if (!itemImage) return; // 如果格子內沒有圖片，不需要綁定事件

    const itemName = newSlot.dataset.name; // 獲取道具名稱

    // 重新綁定事件
    newSlot.addEventListener("click", () => {
      // 如果放大圖或密碼介面正在顯示，禁止操作
      if (isZoomActive || isPasswordInputActive) return;

      // 如果有其他已選中的道具，重置其狀態
      if (currentSelectedItem && currentSelectedItem !== newSlot) {
        currentSelectedItem.classList.remove("selected");
        currentSelectedItem.dataset.clickState = 0; // 重置狀態
        currentSelectedItem = null; // 清空當前選中項
      }

      // 更新當前道具狀態
      let clickState = parseInt(newSlot.dataset.clickState || "0", 10);

      // 狀態切換
      switch (clickState) {
        case 0: // 未選中 → 選中（紅框）
          newSlot.classList.add("selected");
          newSlot.dataset.clickState = 1; // 更新狀態
          currentSelectedItem = newSlot; // 更新選中項
          console.log("0->1");
          break;

        case 1: // 紅框 → 放大圖片
          showZoomWithMessage(itemImage.src, itemName); // 顯示放大圖與名稱
          newSlot.dataset.clickState = 2; // 更新狀態
          console.log("1->2");
          break;

        case 2: // 放大圖片 → 未選中
          newSlot.classList.remove("selected");
          newSlot.dataset.clickState = 0; // 重置狀態
          currentSelectedItem = null; // 清空當前選中
          console.log("2->0");
          break;
      }
    });
  });
}

function removeItemFromSlot(slot) {
  // 確保移除格子內的道具圖片
  const itemImage = slot.querySelector('img');
  if (itemImage) {
    itemImage.remove(); // 移除道具圖片
  }

  // 重置格子的相關屬性
  slot.dataset.name = ''; // 清空道具名稱
  slot.dataset.clickState = '0'; // 重置點擊狀態
  slot.classList.remove('selected'); // 移除選中樣式

  // 移除所有綁定的事件（確保沒有殘留的事件處理）
  const newSlot = slot.cloneNode(true);
  newSlot.className = slot.className; // 保留原有類名
  slot.replaceWith(newSlot); // 用新的格子替換舊格子
  
}

// 更新特定物件的 state
function updateElementState(sceneId, elementId, newState) {
  const scene = scenes.find(scene => scene.id === sceneId);
  if (scene) {
    const element = scene.elements.find(el => el.id === elementId);
    if (element) {
      element.state = newState;
      console.log(`Updated state of ${elementId} to ${newState}`);
    } else {
      console.warn(`Element with ID ${elementId} not found in scene ${sceneId}`);
    }
  } else {
    console.warn(`Scene with ID ${sceneId} not found`);
  }
}



function showTreasurePasswordInput() {
  if (isPasswordInputActive) return; // 如果密碼輸入介面已顯示，禁止重複操作
  isPasswordInputActive = true; // 標記密碼輸入介面顯示中

  const gameContainer = document.getElementById("scene-box");

  // 創建背景遮罩
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.id = "overlay";
  gameContainer.appendChild(overlay);

  // 創建文字方塊
  const messageBox = document.createElement("div");
  messageBox.className = "message-box";
  messageBox.id = "message-box";
  messageBox.textContent = "パスワードを入力するようだ";
  gameContainer.appendChild(messageBox);

  // 創建密碼輸入區域
  const passwordInput = document.createElement("div");
  passwordInput.className = "password-input";
  overlay.appendChild(passwordInput);

  // 初始化密碼方塊
  const password = [0, 0, 0]; // 三位數密碼
  const correctPassword = [5, 7, 4]; // 正確密碼
  const colors = ["#66CC66", "#CCCC66", "#CC6666"]; // 綠、黃、紅

  password.forEach((num, index) => {
    const box = document.createElement("div");
    box.className = "password-box";
    box.textContent = num;
    box.style.backgroundColor = colors[index]; // 設置不同底色
    box.addEventListener("click", () => {
      password[index] = (password[index] + 1) % 10; // 循環加1
      box.textContent = password[index];
    });
    passwordInput.appendChild(box);
  });

  // 創建送出按鈕
  const submitButton = document.createElement("button");
  submitButton.className = "submit-button";
  submitButton.addEventListener("click", () => {
    const treasureElement = scenes.find(scene => scene.id === currentScene).elements.find(e => e.id === "treasure");
    if (password.join("") === correctPassword.join("")) {
      // 更新寶箱狀態
      treasureElement.state = "empty";
      treasureElement.message = "何も入ってない";

      showZoomWithMessage("scene2/control.png", "リモコンを手に入れた");
      addItemToInventory("scene2/control.png","リモコン"); // 添加到道具欄
      isTreasurePasswordCorrect = true; // 更新狀態

      overlay.remove();
      messageBox.remove();
      isPasswordInputActive = false; // 恢復其他操作
    } else {
      messageBox.textContent = "番号が違うようだ";
    }
  });
  overlay.appendChild(submitButton);

  // 創建關閉按鈕
  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.textContent = "閉じる";
  closeButton.addEventListener("click", () => {
    overlay.remove();
    messageBox.remove();
    isPasswordInputActive = false; // 恢復其他操作
  });
  overlay.appendChild(closeButton);
}

function showComputerPasswordInput(zoomSrc) {
  const sceneBox = document.getElementById("scene-box");

  // 如果電腦已解鎖，只顯示放大圖
  if (isComputerUnlocked) {
    showZoomWithMessage(zoomSrc, "パソコンが起動しました");
    return;
  }

  // 如果已有放大圖片，先移除
  const existingOverlay = document.getElementById("overlay");
  const existingMessageBox = document.getElementById("message-box");
  if (existingOverlay) existingOverlay.remove();
  if (existingMessageBox) existingMessageBox.remove();

  isZoomActive = true; // 標記放大圖顯示中

  // 創建黑色背景遮罩
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.className = "overlay";
  sceneBox.appendChild(overlay);

  // 創建放大圖片
  const zoomImage = document.createElement("img");
  zoomImage.id = "zoom-image";
  zoomImage.src = zoomSrc;
  zoomImage.alt = "放大圖片";
  zoomImage.className = "zoom-image";
  overlay.appendChild(zoomImage);

  // 創建輸入框容器
  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  // 創建輸入框
  const passwordInput = document.createElement("input");
  passwordInput.type = "text";
  passwordInput.placeholder = "パスワードを入力";
  passwordInput.className = "password-input-pc";

  // 創建送出按鈕
  const submitButton = document.createElement("button");
  submitButton.className = "submit-button2";

  // 密碼驗證邏輯
  submitButton.addEventListener("click", () => {
    const enteredPassword = passwordInput.value.trim(); // 獲取輸入的密碼
    const correctPassword = "9356";

    if (enteredPassword === correctPassword) {
      // 設置電腦已解鎖狀態
      isComputerUnlocked = true;

      // 移除放大圖及輸入框，顯示成功訊息並添加鑰匙到道具欄
      overlay.remove();
      showMessageBox("鍵を手に入れた！");
      addItemToInventory("scene3/key2.png", "茶色い鍵"); // 添加鑰匙到道具欄
      isZoomActive = false; // 恢復其他操作
    } else {
      // 密碼錯誤，清空輸入框
      passwordInput.value = "";
    }
  });

  // 將輸入框和按鈕添加到容器
  inputContainer.appendChild(passwordInput);
  inputContainer.appendChild(submitButton);
  overlay.appendChild(inputContainer);

  // 創建關閉按鈕
  const closeButton = document.createElement("button");
  closeButton.id = "close-button";
  closeButton.textContent = "閉じる";
  closeButton.className = "close-button";
  overlay.appendChild(closeButton);

  // 關閉按鈕事件
  closeButton.addEventListener("click", () => {
    overlay.remove();
    isZoomActive = false; // 恢復其他操作
  });
}

function handleLockedObjectInteraction(element) {
  const itemName = currentSelectedItem ? currentSelectedItem.dataset.name : null;

  // 如果物件未解鎖且選中了正確的鑰匙
  if (element.state === 'locked' && itemName === '黄色い鍵') {
    element.state = 'unlocked'; // 更新狀態為解鎖
    element.message = 'ん？ここにもローマ数字？'; // 更新訊息

    if (currentSelectedItem) {
      removeItemFromSlot(currentSelectedItem); // 刪除道具圖片，保留格子
      currentSelectedItem = null; // 清空選中道具
    }

    // 立即顯示解鎖後的放大圖示
    //showZoomWithMessage(element.zoomSrc, 'ん？ここにもローマ数字？');
  } 
  else if (element.state === 'locked') {
    showMessageBox(element.message); // 顯示預設訊息
  }
  // 如果未選中正確的道具
  else {
    showMessageBox(element.message); // 顯示預設訊息
  }
}


// 書本點擊事件處理邏輯
function handleBookInteraction(element, img) {
  if (element.state === 'initial') {
    // 如果是初始狀態
    const sceneBox = document.getElementById("scene-box");

    // 如果已有放大圖片或文字方塊，先移除
    const existingZoom = document.getElementById("zoom-image");
    const existingMessage = document.getElementById("message-box");
    const existingOverlay = document.getElementById("overlay");
    if (existingZoom) existingZoom.remove();
    if (existingMessage) existingMessage.remove();
    if (existingOverlay) existingOverlay.remove();

    // 創建黑色背景遮罩
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className = "overlay";
    sceneBox.appendChild(overlay);

    // 創建放大圖片
    const zoomImage = document.createElement("img");
    zoomImage.id = "zoom-image";
    zoomImage.src = element.zoomSrc;
    zoomImage.alt = "放大圖片";
    zoomImage.className = "zoom-image";
    overlay.appendChild(zoomImage);

    // 創建文字方塊
    const messageBox = document.createElement("div");
    messageBox.id = "message-box";
    messageBox.textContent = "何か落ちてきた";
    messageBox.className = "message-box";
    overlay.appendChild(messageBox);

    // 創建關閉按鈕
    const closeButton = document.createElement("button");
    closeButton.id = "close-button";
    closeButton.textContent = "閉じる";
    closeButton.className = "close-button";
    overlay.appendChild(closeButton);

    // 關閉按鈕點擊事件
    closeButton.addEventListener("click", () => {
      overlay.remove();
      addItemToInventory('scene2/memo.png', 'メモ'); // 添加道具到道具欄
      element.state = 'collected'; // 更新狀態為已收集
    });
  } else if (element.state === 'collected') {
    showMessageBox(element.message);
  }
}

function showNarrationOverlay() {
  const sceneBox = document.getElementById("scene-box");

  // 創建黑色半透明背景
  const overlay = document.createElement("div");
  overlay.id = "narration-overlay";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // 半透明黑色背景
  sceneBox.appendChild(overlay);

   // 更新標誌，表示旁白開始
   isNarrationActive = true;

  // 顯示第一行旁白文字
  updateNarrationWithMessageBox(overlay);
}

function updateNarrationWithMessageBox(overlay) {
  const narrationTexts = [
    "…！",
    "8:45…",
    "寝坊してしまった.....",
    "授業まであと１５分",
    "この部屋から出ないと遅刻しちゃう！"
  ];

  let currentNarrationIndex = 0;

  // 顯示第一行
  showNarrationMessageBox(narrationTexts[currentNarrationIndex]);

  // 綁定全畫面點擊事件
  const overlayClickHandler = () => {
    currentNarrationIndex++;

    if (currentNarrationIndex < narrationTexts.length) {
      // 更新為下一行旁白
      showNarrationMessageBox(narrationTexts[currentNarrationIndex]);
    } else {
      // 移除文字方塊和背景
      const messageBox = document.getElementById("message-box");
      if (messageBox) messageBox.remove();
      overlay.remove();
      isNarrationActive = false; // 旁白結束，恢復互動
      document.removeEventListener("click", overlayClickHandler); // 解除綁定
      //startGame(); // 開始遊戲
    }
  };

  // 點擊整個畫面時觸發下一行
  overlay.addEventListener("click", overlayClickHandler);
}

function showNarrationMessageBox(message) {
  const sceneBox = document.getElementById("scene-box");

  // 如果已存在文字方塊，先移除
  const existingBox = document.getElementById("message-box");
  if (existingBox) {
    existingBox.remove();
  }

  // 創建文字方塊
  const messageBox = document.createElement("div");
  messageBox.id = "message-box";
  messageBox.textContent = message;
  messageBox.style.position = "absolute";
  messageBox.style.top = "50%";
  messageBox.style.left = "50%";
  messageBox.style.transform = "translate(-50%, -50%)";
  messageBox.style.width = "80%";
  messageBox.style.padding = "20px";
  messageBox.style.backgroundColor = "#fff"; // 白色背景
  messageBox.style.color = "#000"; // 黑色文字
  messageBox.style.fontSize = "18px";
  messageBox.style.textAlign = "center";
  messageBox.style.borderRadius = "10px";
  messageBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  sceneBox.appendChild(messageBox);

  return messageBox;
}

// 顯示通用 Overlay（支援 Game Over 或 Menu）
function showOverlayWithMenu(titleText, isEndScreen = false) {
  const gameContainer = document.querySelector('.game-container');

  // 創建半透明背景
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'menu-overlay'; // 確保唯一性
  gameContainer.appendChild(overlay);

  // 創建標題文字（Game Over 或 Menu）
  const title = document.createElement("h1");
  title.textContent = titleText; // 動態設置標題內容
  title.style.color = titleText === "Game Over" ? "#FF0000" : "#FFFFFF"; // Game Over 使用紅色，其他使用白色
  title.style.textAlign = "center";
  title.style.marginTop = "200px"; // 添加上邊距讓文字下移
  overlay.appendChild(title);

  
    // 創建按鈕容器
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "menu-container"; // 用來控制按鈕排列的樣式
    overlay.appendChild(buttonContainer);

    // 按鈕文字列表
    const buttonLabels = ["セーブする", "ゲームを終了する", "セーブから再開"];

    // 如果不是關卡結束的 Menu，添加 "キャンセル" 按鈕
    if (!isEndScreen) {
      buttonLabels.push('キャンセル');
    }

    buttonLabels.forEach((label) => {
      const button = document.createElement("button");
      button.textContent = label;
      button.className = "menu-button-option";
      buttonContainer.appendChild(button);

      // 為 "キャンセル" 按鈕綁定事件
      if (label === "キャンセル") {
        button.addEventListener("click", () => {
          overlay.remove(); // 移除 Menu 視窗
        });
      }
      if (label === "ゲームを終了する") {
        button.addEventListener("click", () => {
          // 創建確認小視窗
          const confirmationOverlay = document.createElement("div");
          confirmationOverlay.className = "overlay"; // 半透明背景
          confirmationOverlay.id = "confirmation-overlay";
      
          const confirmationBox = document.createElement("div");
          confirmationBox.className = "confirmation-box"; // 小視窗樣式
          confirmationOverlay.appendChild(confirmationBox);
      
          // 添加訊息
          const message = document.createElement("p");
          message.textContent = "セーブしてなければデータは失われます\nゲームを終了しますか？";
          message.style.textAlign = "center";
          confirmationBox.appendChild(message);
      
          // 添加按鈕容器
          const buttonContainer = document.createElement("div");
          buttonContainer.className = "confirmation-buttons";
          confirmationBox.appendChild(buttonContainer);
      
          // 添加 YES 按鈕
          const yesButton = document.createElement("button");
          yesButton.textContent = "Yes";
          yesButton.className = "menu-button-option";
          yesButton.addEventListener("click", () => {
            window.location.reload(); // 重整頁面
          });
          buttonContainer.appendChild(yesButton);
      
          // 添加 NO 按鈕
          const noButton = document.createElement("button");
          noButton.textContent = "No";
          noButton.className = "menu-button-option";
          noButton.addEventListener("click", () => {
            confirmationOverlay.remove(); // 移除小視窗
          });
          buttonContainer.appendChild(noButton);
      
          // 添加確認小視窗到畫面
          document.querySelector(".game-container").appendChild(confirmationOverlay);
        });
      }
      // 綁定其他按鈕行為
      if (label === "セーブする") {
        button.addEventListener("click", () => {
          // 發送請求檢查後端 session 是否有玩家名稱
          fetch("/check_session")
          .then((response) => response.json())
          .then((data) => {
            if (data.playerName) {
              // 後端已記錄玩家名稱，直接存檔
              saveGame(data.playerName);
            } else {
              // 如果沒有玩家名稱，顯示輸入表單
                showSaveForm();
            }
          })
          .catch(err => console.error("Error checking session:", err));
        });
      }
      if (label === "セーブから再開") {
        button.addEventListener("click", () => {
            // 發送請求檢查後端 Session 是否存在玩家名稱
            fetch("/check_session", {
              method: "GET",
              credentials: "same-origin" // 確保攜帶同源的 Cookie
          })
          .then(response => response.json())
          .then(data => {
              if (data.playerName) {
                  // 後端有玩家名稱
                  fetch(`/load_game?player_name=${encodeURIComponent(data.playerName)}`, {
                      method: "GET",
                      credentials: "same-origin" // 再次攜帶 Cookie
                  })
                  .then(response => response.json())
                  .then(loadData => {
                      if (loadData.success) {
                          loadGameState(loadData.game_state);
                      } else {
                          alert(`進度を読み込むことができませんでした: ${loadData.message}`);
                      }
                  })
                  .catch(err => console.error("進度讀取時發生錯誤：", err));
              } else {
                  alert("セッションが見つかりませんでした。新しいゲームを開始してください。");
              }
          })
          .catch(err => console.error("Error checking session:", err));
        });
    }
    
      // 其他按鈕可在此處添加功能
    });
  
}

// 顯示保存表單
function showSaveForm() {
  const saveForm = document.createElement("div");
  saveForm.className = "load-game-form";
  saveForm.style.display = "flex";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.id = "player-name-input";
  inputField.placeholder = "プレイヤー名を入力してください";

  const saveButton = document.createElement("button");
  saveButton.textContent = "保存";
  saveButton.className = "menu-button-option";

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "キャンセル";
  cancelButton.className = "menu-button-option";

  saveForm.appendChild(inputField);
  saveForm.appendChild(saveButton);
  saveForm.appendChild(cancelButton);
  document.body.appendChild(saveForm);

  // 保存按鈕事件
  saveButton.addEventListener("click", () => {
    const playerName = inputField.value.trim();
    if (playerName) {
      setSessionAndSave(playerName, saveForm);
    } else {
      alert("プレイヤー名を入力してください");
    }
  });
  // 取消按鈕事件
  cancelButton.addEventListener("click", () => {
    saveForm.remove();
  });
}

function setSessionAndSave(playerName, saveForm) {
  fetch("/set_session", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ playerName: playerName }),
  })
  .then(response => response.json())
  .then(data => {
  if (data.success) {
    saveGame(playerName); // 呼叫保存進度函式
    saveForm.remove(); // 隱藏表單
  } else {
    console.error("Error setting session:", data.message);
  }
})
.catch(err => console.error("Error setting session:", err));
}

function saveGame(playerName) {
    // 發送存檔請求
    fetch("/save_game", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        player_name: playerName,
        game_state: getGameState(), // 使用 getGameState() 獲取當前狀態
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("遊戲進度已保存！");
        console.log
      } else {
        console.error("保存進度失敗：", data.message);
      }
    })
    .catch(err => console.error("保存進度時出現錯誤：", err));
}

function getGameState() {
  const state = {};

  scenes.forEach(scene => {
    scene.elements.forEach(element => {
      if (element.id) {
        state[element.id] = {
          state: element.state || null,
          message: element.message || "", // 確保保存文字內容
          src: element.src || ""
        };
      }
    });
  });

  return {
    currentScene: currentScene, // 當前場景
    globals: {
      isPasswordCorrect: isPasswordCorrect,
      hasCollectedItem: hasCollectedItem,
      isTreasurePasswordCorrect: isTreasurePasswordCorrect,
      isComputerUnlocked: isComputerUnlocked,
      hasTakenHiddenKey: hasTakenHiddenKey,
      currentClockIndex: currentClockIndex, // 保存時鐘當前索引
      // 其他需要保存的全域變數
    },
    objectStates: state, // 物件的狀態
    inventory: getInventoryItems(), // 道具欄
  };
}

// 獲取道具欄的物品
function getInventoryItems() {
  const items = [];
  document.querySelectorAll(".item-slot img").forEach((item) => {
    items.push({
      name: item.alt || item.dataset.name || "unknown", // 使用 alt 或 dataset.name 作為名稱
      src: item.src
    });
  });
  return items;
}

function loadGameState(savedState) {
  if (!savedState || !savedState.objectStates) return;

  // 關閉 Menu 視窗
  const menuOverlay = document.getElementById("menu-overlay");
  if (menuOverlay) menuOverlay.remove();

 // 清空道具欄的 DOM
 const inventorySlots = document.querySelectorAll(".item-slot");
 inventorySlots.forEach(slot => {
   const itemImage = slot.querySelector("img");
   if (itemImage) itemImage.remove(); // 移除每個道具圖片
   slot.dataset.name = ""; // 清空道具名稱
 });


  // 2. 清空場景物件的狀態
  scenes.forEach(scene => {
    scene.elements.forEach(element => {
      element.state = null; // 重置狀態
      element.message = ""; // 重置訊息
    });
  });
  console.log("場景物件狀態已清空");


  // 恢復全域變數
  if (savedState.globals) {
    isPasswordCorrect = savedState.globals.isPasswordCorrect;
    hasCollectedItem = savedState.globals.hasCollectedItem;
    isTreasurePasswordCorrect = savedState.globals.isTreasurePasswordCorrect;
    isComputerUnlocked = savedState.globals.isComputerUnlocked;
    hasTakenHiddenKey = savedState.globals.hasTakenHiddenKey;
    console.log("Globals restored:", savedState.globals);
    currentClockIndex = savedState.globals.currentClockIndex || 0; // 還原時鐘索引
  }

  // 更新時鐘圖片
  scenes[0].elements[0].src = clockImages[currentClockIndex];
  
  // 恢復道具欄
  if (savedState.inventory) {
    savedState.inventory.forEach(item => {
      addItemToInventory(item.src, item.name); // 恢復道具
    });
    console.log("Inventory restored.");
  }

  // 還原所有場景物件的狀態
  Object.entries(savedState.objectStates).forEach(([id, data]) => {
    scenes.forEach(scene => {
      const element = scene.elements.find(el => el.id === id);
      if (element) {
        element.state = data.state || null; // 還原狀態
        element.message = data.message || ""; // 還原文字內容
        element.src = data.src || element.src;

        if (id === 'hiddenKey') {
          element.state = data.state || 'hidden'; // 確保狀態正確
        }
      } else {
        console.warn(`Element with ID ${id} not found in any scene`);
      }
    });
  });

  // 還原其他屬性
  currentScene = savedState.currentScene || 1;
  savedState.inventory = savedState.inventory || [];
  savedState.globals = savedState.globals || {};

  // 渲染當前場景
  renderScene(currentScene);
}


document.addEventListener("DOMContentLoaded", () => {

  // 封面按鈕點擊事件
  document.getElementById('start-game-button').addEventListener('click', () => {
    // 發送請求清空存檔
    fetch("/reset_save")
      .then(response => {
        if (response.ok) {
          return response.text(); // 獲取伺服器回傳的訊息
        } else {
          throw new Error("Failed to reset save data");
        }
      })
      .then(data => {
        console.log(data); // 紀錄回傳訊息，例如 "Progress reset"
        document.querySelector(".cover-container").style.display = "none"; // 隱藏封面
        showNarrationOverlay(); // 開始旁白流程
      })
      .catch(error => {
        console.error("Error:", error.message);
      });
  });

  // 點擊 "セーブから再開" 按鈕顯示表單
  document.getElementById("load-game-button").addEventListener("click", () => {
    document.querySelector(".load-game-form").style.display = "block"; // 顯示表單
    document.querySelector(".cover-menu-container").style.display = "none"; // 隱藏按鈕
  });

  // 提交表單，嘗試載入存檔
  document.getElementById("submit-load-button").addEventListener("click", () => {
    const playerName = document.getElementById("player-name-input").value.trim();

    if (playerName === "") {
      alert("プレイヤー名を入力してください！");
      return;
    }

    fetch(`/load_game?player_name=${encodeURIComponent(playerName)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // 載入存檔成功，進入遊戲
          document.querySelector(".cover-container").style.display = "none";
          loadGameState(data.game_state); // 載入遊戲進度
        } else {
          alert("プレイヤー名のセーブデータは存在しません！");
        }
      })
      .catch((err) => console.error("Error:", err));
  });

  // 取消按鈕返回主菜單
  document.getElementById("cancel-load-button").addEventListener("click", () => {
    const loadGameForm = document.querySelector(".load-game-form");
    const playerNameInput = document.getElementById("player-name-input");
    const coverMenuContainer = document.querySelector(".cover-menu-container");
  
    loadGameForm.style.display = "none"; // 隱藏表單
    coverMenuContainer.style.display = "flex"; // 顯示按鈕
  
    // 清除輸入框內容
    playerNameInput.value = "";
  });

  // 定義點擊 Menu 按鈕後的行為
  document.querySelector(".menu-button").addEventListener("click", () => {
    showOverlayWithMenu("Menu", false);
  });
  
});




