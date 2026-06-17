// script.js — данные и логика (без пасхалки)
(function() {
    "use strict";

    // ---------- ДАННЫЕ ПЕРСОНАЖЕЙ (имя, описание, иконка, разблокировка) ----------
    const characters = [
        { name: "Исаак", desc: "Плачет кровавыми слезами. Начинает с d6.", icon: "fa-child", unlock: "Стартовый" },
        { name: "Магдалина", desc: "Медленная, но сильная. Сердце + кусок мяса.", icon: "fa-heart", unlock: "Собрать 7 сердец" },
        { name: "Каин", desc: "Одноглазый бродяга. Высокая удача.", icon: "fa-eye", unlock: "Пожертвовать 55 монет" },
        { name: "Иуда", desc: "Тёмная душа. Высокий урон, мало здоровья.", icon: "fa-hat-wizard", unlock: "Победить Сатану" },
        { name: "Ева", desc: "Душа и тело. Хрупкая, но быстрая.", icon: "fa-ghost", unlock: "Победить Исава?" },
        { name: "Самсон", desc: "Ярость растёт с каждой раной.", icon: "fa-fist-raised", unlock: "Победить Маму" },
        { name: "Азазель", desc: "Короткий Brimstone. Начинает с полётом.", icon: "fa-dragon", unlock: "Сделать 3 сделки с дьяволом" },
        { name: "Забытый", desc: "Скелет с душой. Две формы боя.", icon: "fa-bone", unlock: "Найти кусок скелета" },
        { name: "Лилит", desc: "Инкуб-компаньон. Нет активного предмета.", icon: "fa-crow", unlock: "Победить Гидру" },
        { name: "Каин (альт.)", desc: "Альтернативная версия. Начинает с монетой.", icon: "fa-coins", unlock: "Секретный режим" },
        { name: "Иуда (альт.)", desc: "Тёмный Иуда. Двойная атака.", icon: "fa-mask", unlock: "Пройти Тёмную комнату" },
        { name: "Ева (альт.)", desc: "Плачущая Ева. Начинает с мечом.", icon: "fa-sword", unlock: "Победить Мать" }
    ];

    // ---------- ДАННЫЕ КОНЦОВОК И ПУТЕЙ ----------
    const endings = [
        { name: "Концовка #1", desc: "Исаак убегает от мамы. Базовый финал.", icon: "fa-running" },
        { name: "Концовка #2", desc: "Мама находит Исаака... Трагический поворот.", icon: "fa-heart-broken" },
        { name: "Концовка #3", desc: "Исаак сражается с собственным отражением.", icon: "fa-mask" },
        { name: "Концовка #4", desc: "Путь к свету — Исаак попадает в рай.", icon: "fa-cloud" },
        { name: "Концовка #5", desc: "Тёмная комната. Победа над Тьмой.", icon: "fa-moon" },
        { name: "Концовка #6", desc: "Секретный финал — истинное покаяние.", icon: "fa-dragon" },
        { name: "Концовка #7", desc: "Путь грешника — Сатана повержен.", icon: "fa-fire" },
        { name: "Концовка #8", desc: "Мать повержена. Семья воссоединяется?", icon: "fa-family" },
        { name: "Концовка #9", desc: "Альтернативная реальность — Исаак в больнице.", icon: "fa-hospital" },
        { name: "Концовка #10", desc: "Последний бой с самим собой. Решение.", icon: "fa-skull-crossbones" }
    ];

    // ---------- ОТРИСОВКА ПЕРСОНАЖЕЙ ----------
    const charGrid = document.getElementById('characterGrid');
    if (charGrid) {
        characters.forEach(ch => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <i class="fas ${ch.icon}"></i>
                <h3>${ch.name}</h3>
                <p>${ch.desc}</p>
                <span class="badge"><i class="fas fa-lock-open"></i> ${ch.unlock}</span>
            `;
            charGrid.appendChild(card);
        });
    }

    // ---------- ОТРИСОВКА КОНЦОВОК ----------
    const endingList = document.getElementById('endingList');
    if (endingList) {
        endings.forEach(end => {
            const row = document.createElement('div');
            row.className = 'ending-row';
            row.innerHTML = `
                <i class="fas ${end.icon}"></i>
                <strong>${end.name}</strong>
                <span>${end.desc}</span>
            `;
            endingList.appendChild(row);
        });
    }

    // ---------- ТАБЫ (переключение) ----------
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = {
        about: document.getElementById('about'),
        characters: document.getElementById('characters'),
        endings: document.getElementById('endings')
    };

    function activateTab(tabId) {
        tabs.forEach(btn => btn.classList.remove('active'));
        Object.values(sections).forEach(sec => sec.classList.remove('active'));

        const activeBtn = Array.from(tabs).find(btn => btn.dataset.tab === tabId);
        if (activeBtn) activeBtn.classList.add('active');
        if (sections[tabId]) sections[tabId].classList.add('active');
    }

    tabs.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const tabId = this.dataset.tab;
            if (tabId) {
                activateTab(tabId);
                window.location.hash = tabId;
            }
        });
    });

    // ---------- ОБРАБОТКА ЯКОРЕЙ (при загрузке) ----------
    window.addEventListener('load', function() {
        const hash = window.location.hash.replace('#', '');
        if (hash && (hash === 'about' || hash === 'characters' || hash === 'endings')) {
            activateTab(hash);
        }
        if (!hash) {
            activateTab('about');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').replace('#', '');
            if (targetId && (targetId === 'about' || targetId === 'characters' || targetId === 'endings')) {
                e.preventDefault();
                activateTab(targetId);
                window.location.hash = targetId;
            }
        });
    });

    console.log('🕯️ The Binding of Isaac: Repentance+ — сайт загружен.');
})();
