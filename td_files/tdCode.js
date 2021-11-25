"use strict";

function makeSquare(type) {
  const square = document.createElement("div");
  square.className = "square";
  square.id = type;
  document.querySelector("#grounds").append(square);
}

function generateGrounds(len) {
  if (len % 2 !== 0) {
    for (let i = 1; i <= len ** 2; i++) {
      if (i === len * 2 + 1) {
        makeSquare("startPt");
      } else if (i >= len * 2 + 1 && i <= len * 3 - 2) {
        makeSquare("valley");
      } else if (
        (i > len * 3 && i - len * 3 === len - 2) ||
        i - len * 4 === len - 2
      ) {
        makeSquare("valley");
      } else if (i >= len * 5 + 3 && i <= len * 6 - 2) {
        makeSquare("valley");
      } else if (
        (i > len * 6 && i - len * 6 === len - 8) ||
        i - len * 7 === len - 8
      ) {
        makeSquare("valley");
      } else if (i >= len * 8 + 3 && i <= len * 9 - 1) {
        makeSquare("valley");
      } else if (i === len * 9) {
        makeSquare("endPt");
      } else {
        makeSquare();
      }
    }
    document.querySelector("#grounds").style.width = `${len * 53}px`;
    document.querySelector("#bottom").style.width = `${len * 53}px`;
  } else {
    alert("Please input an odd number!");
  }
}
generateGrounds(11);

const arrowTowerCost = 15;
const arrowTowerRange = 2;

const cannonTowerCost = 25;
const cannonTowerRange = 3;

let interestLvl = 0;
let costLvl = 0;
let rangeLvl = 0;
let waveNum = 0;
let enemySpeed = 41;
let enemyHealth = 100;
let enemyFreq = 1210;
let interest = 10;

const mouseoverArrow = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "black";
  descriptionBox.style.fontWeight = "bold";

  descriptionBox.innerHTML = `ARROW TOWER [$ ${
    arrowTowerCost - costLvl
  }]<br /><br />Does low damage but fast fire rate<br /><br /><span id='toolTip'>Click on a tile to select it, then click on this.</span>`;
};
const mouseoutArrow = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "#454545";
  descriptionBox.style.fontWeight = "normal";
  descriptionBox.innerText = "Hover over the objects to see its details.";
};
document
  .getElementById("buildArrow")
  .addEventListener("mouseover", mouseoverArrow);
document
  .getElementById("buildArrow")
  .addEventListener("mouseout", mouseoutArrow);

const mouseoverCannon = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "black";
  descriptionBox.style.fontWeight = "bold";

  descriptionBox.innerHTML = `CANNON [$ ${
    cannonTowerCost - costLvl
  }]<br /><br />Does splash damage to a small area but slower fire rate<br /><br /><span id='toolTip'>Click on a tile to select it, then click on this.</span>`;
};
const mouseoutCannon = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "#454545";
  descriptionBox.style.fontWeight = "normal";
  descriptionBox.innerText = "Hover over the objects to see its details.";
};
document
  .getElementById("buildCannon")
  .addEventListener("mouseover", mouseoverCannon);
document
  .getElementById("buildCannon")
  .addEventListener("mouseout", mouseoutCannon);

const mouseoverInterest = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "#493548";
  descriptionBox.style.fontWeight = "bold";

  descriptionBox.innerHTML = `INVESTMENT [2 GEMS]<br /><br />Remaining unused gold at end of a wave +10% per lvl<br /><br /><span id='toolTip'>Current Lvl [${interestLvl}]</span>`;
};
const mouseoutInterest = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "#454545";
  descriptionBox.style.fontWeight = "normal";
  descriptionBox.innerText = "Hover over the objects to see its details.";
};
document
  .getElementById("interest")
  .addEventListener("mouseover", mouseoverInterest);
document
  .getElementById("interest")
  .addEventListener("mouseout", mouseoutInterest);

const researchInterest = () => {
  const price = 2;
  const gems = document.getElementById("gemInt").innerText;
  const currentGems = parseInt(gems);
  if (currentGems - price < 0) {
    alert("Insufficient gems!");
  } else {
    document.getElementById("gemInt").innerText = currentGems - price;
    interestLvl += 1;
    const descriptionBox = document.getElementById("descriptions");
    descriptionBox.innerHTML = `INVESTMENT [2 GEMS]<br /><br />Remaining unused gold at end of a wave +10% per lvl<br /><br /><span id='toolTip'>Current Lvl [${interestLvl}]</span>`;
  }
};
document.getElementById("interest").addEventListener("click", researchInterest);

const mouseoverCost = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "#493548";
  descriptionBox.style.fontWeight = "bold";

  descriptionBox.innerHTML = `LOGISTICS [2 GEMS]<br /><br />Cost of all buildings -$1 per lvl<br /><br /><span id='toolTip'>Current Lvl [${costLvl}]</span>`;
};
const mouseoutCost = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "#454545";
  descriptionBox.style.fontWeight = "normal";
  descriptionBox.innerText = "Hover over the objects to see its details.";
};
document.getElementById("cost").addEventListener("mouseover", mouseoverCost);
document.getElementById("cost").addEventListener("mouseout", mouseoutCost);

const researchCost = () => {
  const price = 2;
  const gems = document.getElementById("gemInt").innerText;
  const currentGems = parseInt(gems);
  if (currentGems - price < 0) {
    alert("Insufficient gems!");
  } else {
    document.getElementById("gemInt").innerText = currentGems - price;
    costLvl += 1;
    const descriptionBox = document.getElementById("descriptions");
    descriptionBox.innerHTML = `LOGISTICS [2 GEMS]<br /><br />Cost of all buildings -$2 per lvl<br /><br /><span id='toolTip'>Current Lvl [${costLvl}]</span>`;
  }
};
document.getElementById("cost").addEventListener("click", researchCost);

const mouseoverRange = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "#493548";
  descriptionBox.style.fontWeight = "bold";

  descriptionBox.innerHTML = `INFRASTRUCTURE<br />[2 GEMS]<br /><br />Range of all future buildings +1 tile per lvl<br /><br /><span id='toolTip'>Current Lvl [${rangeLvl}]</span>`;
};
const mouseoutRange = () => {
  const descriptionBox = document.getElementById("descriptions");
  descriptionBox.style.color = "#454545";
  descriptionBox.style.fontWeight = "normal";
  descriptionBox.innerText = "Hover over the objects to see its details.";
};
document.getElementById("range").addEventListener("mouseover", mouseoverRange);
document.getElementById("range").addEventListener("mouseout", mouseoutRange);

const researchRange = () => {
  const price = 3;
  const gems = document.getElementById("gemInt").innerText;
  const currentGems = parseInt(gems);
  if (currentGems - price < 0) {
    alert("Insufficient gems!");
  } else {
    document.getElementById("gemInt").innerText = currentGems - price;
    rangeLvl += 1;
    const descriptionBox = document.getElementById("descriptions");
    descriptionBox.innerHTML = `INFRASTRUCTURE<br />[2 GEMS]<br /><br />Range of all future buildings +1 tile per lvl<br /><br /><span id='toolTip'>Current Lvl [${rangeLvl}]</span>`;
  }
};
document.getElementById("range").addEventListener("click", researchRange);

const lit = (e) => {
  if (e.target.className === "square") {
    e.target.classList.add("lit");
    const selector = () => {
      if (
        e.target.id !== "valley" &&
        e.target.id !== "startPt" &&
        e.target.id !== "endPt"
      ) {
        if (e.target.id !== "selection") {
          e.target.id = "selection";
        } else {
          e.target.id = "";
        }
      }
    };
    document
      .getElementsByClassName("lit")[0]
      .addEventListener("click", selector);
  }
};
const unlit = (e) => {
  if (e.target.className === "square lit") {
    e.target.classList.remove("lit");
  }
};
document.getElementById("grounds").addEventListener("mouseover", lit);
document.getElementById("grounds").addEventListener("mouseout", unlit);

let totalEnemyCount = 0;

const spawnWave = () => {
  waveNum += 1;
  enemySpeed -= 1;
  enemyHealth += 20;
  enemyFreq -= 10;
  const display = document.getElementById("display");
  display.innerHTML = `Current wave: ${waveNum}<br /><br />Number of mobs: ${
    waveNum + 4
  }<br />Mob Hp: ${enemyHealth}<br />$$ per mob: ${enemyHealth / 20}`;

  const spawnEnemy = () => {
    totalEnemyCount += 1;
    const spawnPt = document.getElementById("startPt").getBoundingClientRect();

    const enemy = document.createElement("div");
    enemy.className = "mob";
    enemy.id = `mob${totalEnemyCount}`;
    const enemyHp = document.createElement("div");
    enemyHp.className = "enemyHp";
    const enemyLostHp = document.createElement("div");
    enemyLostHp.className = "enemyLostHp";
    const enemySprite = document.createElement("div");
    enemySprite.className = "enemySprite";
    enemy.setAttribute("hp", `${enemyHealth}`);
    enemy.setAttribute("lostHp", 0);
    enemy.setAttribute("gold", `${enemyHealth / 20}`);

    enemy.append(enemyHp);
    enemy.append(enemyLostHp);
    enemy.append(enemySprite);

    enemy.style.top = `${
      spawnPt.y + spawnPt.height / 2 + window.scrollY - 14
    }px`;
    enemy.style.left = `${
      spawnPt.x + spawnPt.width / 2 + window.scrollX - 10
    }px`;

    document.body.append(enemy);

    const enemyMovement = () => {
      const endPt = document.getElementById("endPt").getBoundingClientRect();

      if (enemy.getAttribute("hp") !== "0") {
        const gridLength = document.getElementById("valley").offsetWidth;
        const mobLocation = enemy.getBoundingClientRect();
        const step = 1;
        if (
          mobLocation.left + window.scrollX <
            endPt.left + window.scrollX + 14 - gridLength * 2 &&
          mobLocation.top + window.scrollY <
            endPt.top + window.scrollY + 14 - gridLength * 3
        ) {
          enemy.style.left = `${mobLocation.x + window.scrollX + step}px`;
        } else if (
          mobLocation.top + window.scrollY <
          endPt.top + window.scrollY + 14 - gridLength * 3
        ) {
          enemy.style.top = `${mobLocation.y + window.scrollY + step}px`;
        } else if (
          mobLocation.left + window.scrollX >
            endPt.left + window.scrollX + 22 - gridLength * 8 &&
          mobLocation.top + window.scrollY < endPt.top + window.scrollY + 14
        ) {
          enemy.style.left = `${mobLocation.x + window.scrollX - step}px`;
        } else if (
          mobLocation.top + window.scrollY <
          endPt.top + window.scrollY + 14
        ) {
          enemy.style.top = `${mobLocation.y + window.scrollY + step}px`;
        } else if (
          mobLocation.left + window.scrollX <
          endPt.left + window.scrollX + 14
        ) {
          enemy.style.left = `${mobLocation.x + window.scrollX + step}px`;
        } else {
          enemy.remove();
          clearInterval(enemyMoveInterval);

          const towerDmgSound = document.createElement("AUDIO");
          towerDmgSound.setAttribute("src", "audio/castleDmgSound.mp3");
          document.body.append(towerDmgSound);
          towerDmgSound.play();

          let hp = document.getElementById("healthInt").innerText;
          const currentHp = parseInt(hp);
          if (currentHp > 0) {
            document.getElementById("healthInt").innerText = currentHp - 1;
          } else {
            alert("GAME OVER!!! T__T");
            window.location.reload();
          }
        }
      }
    };
    const enemyMoveInterval = setInterval(enemyMovement, enemySpeed);
  };
  const numberOfEnemies = 4 + waveNum;

  const setIntervalX = (callback, interval, repetitions) => {
    let x = 0;
    const intervalID = setInterval(() => {
      callback();
      if (++x === repetitions) {
        clearInterval(intervalID);
        const checkForWaveEnd = () => {
          const enemiesLeft = document.getElementsByClassName("mob").length;
          console.log();
          if (enemiesLeft === 0) {
            const money = document.getElementById("moneyInt");
            const gems = document.getElementById("gemInt");
            const currentMoney = parseInt(money.innerText);
            const currentGems = parseInt(gems.innerText);
            const interestAmt = Math.ceil(
              (currentMoney * (interest + interestLvl * 10)) / 100
            );
            const moneyNow = interestAmt + currentMoney;
            const gemsNow = currentGems + 1;
            money.innerText = moneyNow;
            gems.innerText = gemsNow;
            display.innerHTML = `Wave ${waveNum} cleared!<br /><br />A ${
              interest + interestLvl * 10
            }% interest of $${interestAmt} was earned!<br />1 gem earned!<br /><br />Click play to start next wave!`;

            const waveEndSound = document.createElement("AUDIO");
            waveEndSound.setAttribute("src", "audio/waveEndSound.mp3");
            document.body.append(waveEndSound);
            waveEndSound.play();

            clearInterval(waveEnd);
          }
        };
        const waveEnd = setInterval(checkForWaveEnd, 100);
      }
    }, interval);
  };
  setIntervalX(spawnEnemy, enemyFreq, numberOfEnemies);
};
document.getElementById("start").addEventListener("click", spawnWave);

const buildArrow = () => {
  const range = arrowTowerRange + rangeLvl;
  const towerCost = arrowTowerCost - costLvl;
  const money = parseInt(document.getElementById("moneyInt").innerText);
  if (document.getElementById("selection") === null) {
    alert("Please select a tile build on!");
  } else if (money - towerCost < 0) {
    alert("Insufficient money!");
  } else {
    document.getElementById("moneyInt").innerText = money - towerCost;
    const selectedTile = document.getElementById("selection");
    selectedTile.classList.add("tower");
    selectedTile.style.backgroundImage = "url('images/towerImg.jpg')";
    const selectedPosition = selectedTile.getBoundingClientRect();

    const towerRange = document.createElement("div");
    selectedTile.append(towerRange);
    towerRange.className = "towerRange";
    towerRange.style.height = `${range * 52 * 2 + 52 - 4}px`;
    towerRange.style.width = `${range * 52 * 2 + 52 - 4}px`;
    towerRange.style.borderRadius = `${(range * 52 * 2 + 52 - 4) / 2}px`;
    towerRange.style.zIndex = -1;

    const showRange = () => {
      towerRange.style.zIndex = 0;
    };
    const hideRange = () => {
      towerRange.style.zIndex = -1;
    };
    selectedTile.addEventListener("mouseenter", showRange);
    selectedTile.addEventListener("mouseleave", hideRange);

    const findTarget = () => {
      const towerRadius = (range * 52 * 2 + 52 - 4) / 2;
      const allEnemyList = document.getElementsByClassName("mob");

      if (allEnemyList.length === 0) {
        return null;
      } else {
        let enemyList = [];

        for (let enemy of allEnemyList) {
          const enemyRect = enemy.children[2].getBoundingClientRect();
          const enemyRadius = enemyRect.width / 2;

          const towerCentre = {
            x: towerRange.getBoundingClientRect().x,
            y: towerRange.getBoundingClientRect().y,
          };
          const enemyLocation = {
            x: enemyRect.x,
            y: enemyRect.y,
          };
          const dx =
            towerCentre.x + towerRadius - (enemyLocation.x + enemyRadius);
          const dy =
            towerCentre.y + towerRadius - (enemyLocation.y + enemyRadius);
          const dist = Math.sqrt(dx ** 2 + dy ** 2);
          if (dist <= towerRadius + enemyRadius) {
            const potentialTarget = { id: `${enemy.id}`, dist: `${dist}` };
            enemyList.push(potentialTarget);
          }
        }
        if (enemyList.length === 0) {
          return null;
        } else {
          const target = document.getElementById(
            enemyList.sort((a, b) => (a.dist < b.dist ? a : b))[0].id
          );
          return target;
        }
      }
    };

    const shoot = () => {
      const arrowSound = document.createElement("AUDIO");
      arrowSound.setAttribute("src", "audio/arrowSound.mp3");
      document.body.append(arrowSound);
      arrowSound.play();

      const projectile = document.createElement("div");
      selectedTile.append(projectile);
      projectile.className = "arrowProjectile";
      projectile.style.top = selectedPosition.y + 26;
      projectile.style.left = selectedPosition.x + 26;

      const projectileDmg = 10;
      let moveY = 1;
      let moveX = 1;

      const damageMob = () => {
        const mobHitSound = document.createElement("AUDIO");
        mobHitSound.setAttribute("src", "audio/mobHitSound.mp3");
        document.body.append(mobHitSound);
        mobHitSound.play();

        const mobHit = findTarget();
        const mobHitHp = findTarget().children[0];
        const mobHitLostHp = findTarget().children[1];

        const currentHp = parseInt(mobHit.getAttribute("hp"));
        const currentLostHp = parseInt(mobHit.getAttribute("lostHp"));
        const maxHp = currentHp + currentLostHp;

        const newHp = currentHp - projectileDmg;
        if (newHp <= 0) {
          projectile.remove();
          let money = document.getElementById("moneyInt").innerText;
          let score = document.getElementById("scoreInt").innerText;
          const mobGold = parseInt(mobHit.getAttribute("gold"));
          const currentScore = parseInt(score);
          const currentMoney = parseInt(money);
          document.getElementById("moneyInt").innerText =
            currentMoney + mobGold;
          document.getElementById("scoreInt").innerText =
            currentScore + mobGold;

          mobHit.remove();
          const mobDeathSound = document.createElement("AUDIO");
          mobDeathSound.setAttribute("src", "audio/mobDeathSound.mp3");
          document.body.append(mobDeathSound);
          mobDeathSound.play();
        }
        mobHit.setAttribute("hp", newHp);
        const newLostHp = currentLostHp + projectileDmg;
        mobHit.setAttribute("lostHp", newLostHp);

        mobHitHp.style.width = `${(newHp / maxHp) * 22}px`;
        mobHitLostHp.style.width = `${(newLostHp / maxHp) * 22}px`;
      };

      const projectileMotion = () => {
        if (findTarget() !== null) {
          const projectileRadius = projectile.getBoundingClientRect().width / 2;
          const projectileLocation = {
            x: projectile.getBoundingClientRect().x,
            y: projectile.getBoundingClientRect().y,
          };
          const mobRadius =
            findTarget().children[2].getBoundingClientRect().width / 2;
          const mobLocation = {
            x: findTarget().children[2].getBoundingClientRect().x,
            y: findTarget().children[2].getBoundingClientRect().y,
          };
          const dx =
            projectileLocation.x +
            projectileRadius -
            (mobLocation.x + mobRadius);
          const dy =
            projectileLocation.y +
            projectileRadius -
            (mobLocation.y + mobRadius);
          const dist = Math.sqrt(dx ** 2 + dy ** 2);

          if (dist > mobRadius) {
            if (projectileLocation.y < mobLocation.y) {
              projectile.style.transform = `translate(${moveX}px,${moveY}px)`;
              moveY += Math.abs(dy / (dx + 2));
            } else {
              projectile.style.transform = `translate(${moveX}px,${moveY}px)`;
              moveY -= Math.abs(dy / (dx + 2));
            }

            if (projectileLocation.x < mobLocation.x) {
              projectile.style.transform = `translate(${moveX}px, ${moveY}px)`;
              moveX += Math.abs(dx / (dy + 2));
            } else {
              projectile.style.transform = `translate(${moveX}px,${moveY}px)`;
              moveX -= Math.abs(dx / (dy + 2));
            }
          } else {
            projectile.remove();
            damageMob();
          }
        } else {
          clearInterval(movingProjectile);
          projectile.remove();
        }
      };
      const movingProjectile = setInterval(projectileMotion, 1);
    };

    const withinRange = () => {
      if (findTarget() !== null) {
        const towerRadius = (range * 52 * 2 + 52 - 4) / 2;
        const mobRadius = findTarget().children[2].style.width / 2;
        const towerCentre = {
          x: towerRange.getBoundingClientRect().x,
          y: towerRange.getBoundingClientRect().y,
        };
        const mobLocation = {
          x: findTarget().children[2].getBoundingClientRect().x,
          y: findTarget().children[2].getBoundingClientRect().y,
        };
        const dx = towerCentre.x + towerRadius - (mobLocation.x + mobRadius);
        const dy = towerCentre.y + towerRadius - (mobLocation.y + mobRadius);
        const dist = Math.sqrt(dx ** 2 + dy ** 2);

        if (dist <= towerRadius + mobRadius && findTarget() !== null) {
          shoot();
        }
      }
    };
    setInterval(withinRange, 700);
    selectedTile.id = "";
  }
};
document.getElementById("buildArrow").addEventListener("click", buildArrow);

const buildCannon = () => {
  const range = cannonTowerRange + rangeLvl;
  const towerCost = cannonTowerCost - costLvl * 2;
  const money = parseInt(document.getElementById("moneyInt").innerText);
  if (document.getElementById("selection") === null) {
    alert("Please select a tile build on!");
  } else if (money - towerCost < 0) {
    alert("Insufficient money!");
  } else {
    document.getElementById("moneyInt").innerText = money - towerCost;
    const selectedTile = document.getElementById("selection");
    selectedTile.classList.add("tower");
    selectedTile.style.backgroundImage = "url('images/cannonImg.png')";
    const selectedPosition = selectedTile.getBoundingClientRect();

    const towerRange = document.createElement("div");
    selectedTile.append(towerRange);
    towerRange.className = "towerRange";
    towerRange.style.height = `${range * 52 * 2 + 52 - 4}px`;
    towerRange.style.width = `${range * 52 * 2 + 52 - 4}px`;
    towerRange.style.borderRadius = `${(range * 52 * 2 + 52 - 4) / 2}px`;
    towerRange.style.zIndex = -1;

    const showRange = () => {
      towerRange.style.zIndex = 0;
    };
    const hideRange = () => {
      towerRange.style.zIndex = -1;
    };
    selectedTile.addEventListener("mouseenter", showRange);
    selectedTile.addEventListener("mouseleave", hideRange);

    const findTarget = () => {
      const towerRadius = (range * 52 * 2 + 52 - 4) / 2;
      const allEnemyList = document.getElementsByClassName("mob");

      if (allEnemyList.length === 0) {
        return null;
      } else {
        let enemyList = [];

        for (let enemy of allEnemyList) {
          const enemyRect = enemy.children[2].getBoundingClientRect();
          const enemyRadius = enemyRect.width / 2;

          const towerCentre = {
            x: towerRange.getBoundingClientRect().x,
            y: towerRange.getBoundingClientRect().y,
          };
          const enemyLocation = {
            x: enemyRect.x,
            y: enemyRect.y,
          };
          const dx =
            towerCentre.x + towerRadius - (enemyLocation.x + enemyRadius);
          const dy =
            towerCentre.y + towerRadius - (enemyLocation.y + enemyRadius);
          const dist = Math.sqrt(dx ** 2 + dy ** 2);
          if (dist <= towerRadius + enemyRadius) {
            const potentialTarget = { id: `${enemy.id}`, dist: `${dist}` };
            enemyList.push(potentialTarget);
          }
        }
        if (enemyList.length === 0) {
          return null;
        } else {
          const target = document.getElementById(
            enemyList.sort((a, b) => (a.dist < b.dist ? a : b))[0].id
          );
          return target;
        }
      }
    };

    const shoot = () => {
      const cannonSound = document.createElement("AUDIO");
      cannonSound.setAttribute("src", "audio/cannonSound.mp3");
      document.body.append(cannonSound);
      cannonSound.play();

      const projectile = document.createElement("div");
      selectedTile.append(projectile);
      projectile.className = "cannonProjectile";
      projectile.style.top = selectedPosition.y + 26;
      projectile.style.left = selectedPosition.x + 26;

      const projectileDmg = 20;
      let moveY = 1;
      let moveX = 1;

      const damageMob = (enemy) => {
        const mobHitSound = document.createElement("AUDIO");
        mobHitSound.setAttribute("src", "audio/mobHitSound.mp3");
        document.body.append(mobHitSound);
        mobHitSound.play();

        const mobHit = enemy;
        const mobHitHp = enemy.children[0];
        const mobHitLostHp = enemy.children[1];

        const currentHp = parseInt(mobHit.getAttribute("hp"));
        const currentLostHp = parseInt(mobHit.getAttribute("lostHp"));
        const maxHp = currentHp + currentLostHp;

        const newHp = currentHp - projectileDmg;
        if (newHp <= 0) {
          projectile.remove();
          let money = document.getElementById("moneyInt").innerText;
          let score = document.getElementById("scoreInt").innerText;
          const mobGold = parseInt(mobHit.getAttribute("gold"));
          const currentScore = parseInt(score);
          const currentMoney = parseInt(money);
          document.getElementById("moneyInt").innerText =
            currentMoney + mobGold;
          document.getElementById("scoreInt").innerText =
            currentScore + mobGold;

          mobHit.remove();
          const mobDeathSound = document.createElement("AUDIO");
          mobDeathSound.setAttribute("src", "audio/mobDeathSound.mp3");
          document.body.append(mobDeathSound);
          mobDeathSound.play();
        }
        mobHit.setAttribute("hp", newHp);
        const newLostHp = currentLostHp + projectileDmg;
        mobHit.setAttribute("lostHp", newLostHp);

        mobHitHp.style.width = `${(newHp / maxHp) * 22}px`;
        mobHitLostHp.style.width = `${(newLostHp / maxHp) * 22}px`;
      };

      const damageArea = () => {
        const mobHit = findTarget().children[2];

        const blastRange = document.createElement("div");
        mobHit.append(blastRange);
        blastRange.className = "blastRange";
        blastRange.style.height = `60px`;
        blastRange.style.width = `60px`;
        blastRange.style.borderRadius = `30px`;
        blastRange.style.transform = `translate(-25px,-25px)`;

        const blastRadius = 20;
        const allEnemyList = document.getElementsByClassName("mob");

        if (allEnemyList.length !== 0) {
          let enemyList = [];

          for (let enemy of allEnemyList) {
            const enemyRect = enemy.children[2].getBoundingClientRect();
            const enemyRadius = enemyRect.width / 2;

            const blastLocation = {
              x: blastRange.getBoundingClientRect().x,
              y: blastRange.getBoundingClientRect().y,
            };
            const enemyLocation = {
              x: enemyRect.x,
              y: enemyRect.y,
            };
            const dx =
              blastLocation.x + blastRadius - (enemyLocation.x + enemyRadius);
            const dy =
              blastLocation.y + blastRadius - (enemyLocation.y + enemyRadius);
            const dist = Math.sqrt(dx ** 2 + dy ** 2);
            if (dist <= blastRadius + enemyRadius) {
              const potentialTarget = { id: `${enemy.id}`, dist: `${dist}` };
              enemyList.push(potentialTarget);
            }
          }
          if (enemyList.length !== 0) {
            for (let enemy of enemyList) {
              const target = document.getElementById(enemy.id);
              damageMob(target);
              function removeFadeOut(element, speed) {
                var seconds = speed / 1000;
                element.style.transition = "opacity " + seconds + "s ease";
                element.style.opacity = 0;
                setTimeout(function () {
                  element.remove();
                }, speed);
              }
              removeFadeOut(blastRange, 1000);
            }
          }
        }
      };

      const projectileMotion = () => {
        if (findTarget() !== null) {
          const projectileRadius = projectile.getBoundingClientRect().width / 2;
          const projectileLocation = {
            x: projectile.getBoundingClientRect().x,
            y: projectile.getBoundingClientRect().y,
          };
          const mobRadius =
            findTarget().children[2].getBoundingClientRect().width / 2;
          const mobLocation = {
            x: findTarget().children[2].getBoundingClientRect().x,
            y: findTarget().children[2].getBoundingClientRect().y,
          };
          const dx =
            projectileLocation.x +
            projectileRadius -
            (mobLocation.x + mobRadius);
          const dy =
            projectileLocation.y +
            projectileRadius -
            (mobLocation.y + mobRadius);
          const dist = Math.sqrt(dx ** 2 + dy ** 2);

          if (dist > mobRadius) {
            if (projectileLocation.y < mobLocation.y) {
              projectile.style.transform = `translate(${moveX}px,${moveY}px)`;
              moveY += Math.abs(dy / (dx + 2)) / 2;
            } else {
              projectile.style.transform = `translate(${moveX}px,${moveY}px)`;
              moveY -= Math.abs(dy / (dx + 2)) / 2;
            }

            if (projectileLocation.x < mobLocation.x) {
              projectile.style.transform = `translate(${moveX}px, ${moveY}px)`;
              moveX += Math.abs(dx / (dy + 2)) / 2;
            } else {
              projectile.style.transform = `translate(${moveX}px,${moveY}px)`;
              moveX -= Math.abs(dx / (dy + 2)) / 2;
            }
          } else {
            projectile.remove();
            damageArea();
          }
        } else {
          clearInterval(movingProjectile);
          projectile.remove();
        }
      };
      const movingProjectile = setInterval(projectileMotion, 1);
    };

    const withinRange = () => {
      if (findTarget() !== null) {
        const towerRadius = (range * 52 * 2 + 52 - 4) / 2;
        const mobRadius = findTarget().children[2].style.width / 2;
        const towerCentre = {
          x: towerRange.getBoundingClientRect().x,
          y: towerRange.getBoundingClientRect().y,
        };
        const mobLocation = {
          x: findTarget().children[2].getBoundingClientRect().x,
          y: findTarget().children[2].getBoundingClientRect().y,
        };
        const dx = towerCentre.x + towerRadius - (mobLocation.x + mobRadius);
        const dy = towerCentre.y + towerRadius - (mobLocation.y + mobRadius);
        const dist = Math.sqrt(dx ** 2 + dy ** 2);

        if (dist <= towerRadius + mobRadius && findTarget() !== null) {
          shoot();
        }
      }
    };
    setInterval(withinRange, 1500);
    selectedTile.id = "";
  }
};
document.getElementById("buildCannon").addEventListener("click", buildCannon);
