 // Estado de la aplicación
        let levels = [
            { id: 1, name: "Nivel 1", sub: ["Subnivel 1.1"] }
        ];
        let currentType = 'pregunta';
        let tfValue = true;
        let pins = [];

        // Inicialización
        window.onload = () => {
            renderTree();
            renderCanvas();
        };

        // --- GESTIÓN DE NIVELES ---
        function renderTree() {
            const container = document.getElementById('tree-container');
            container.innerHTML = '';

            levels.forEach(lvl => {
                const item = document.createElement('div');
                item.className = 'tree-item';
                item.innerHTML = `<span><i class="fa-solid fa-folder"></i> ${lvl.name}</span>`;
                item.onclick = () => setLevelTitle(lvl.name);
                container.appendChild(item);

                lvl.sub.forEach(sub => {
                    const subItem = document.createElement('div');
                    subItem.className = 'tree-item tree-subitem';
                    subItem.innerHTML = `<span><i class="fa-solid fa-file"></i> ${sub}</span>`;
                    subItem.onclick = (e) => {
                        e.stopPropagation();
                        setLevelTitle(`${lvl.name} - ${sub}`);
                    };
                    container.appendChild(subItem);
                });
            });
        }

        function setLevelTitle(title) {
            document.getElementById('active-level-title').innerText = title;
        }

        function addLevel() {
            const newId = levels.length + 1;
            levels.push({ id: newId, name: `Nivel ${newId}`, sub: [] });
            renderTree();
        }

        function addSublevel() {
            if (levels.length === 0) return;
            const lastLvl = levels[levels.length - 1];
            lastLvl.sub.push(`Subnivel ${lastLvl.id}.${lastLvl.sub.length + 1}`);
            renderTree();
        }

        // --- CAMBIO DE TIPO DE PREGUNTA ---
        function setQuestionType(type, btn) {
            currentType = type;
            document.querySelectorAll('.btn-type').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCanvas();
        }

        // --- RENDERIZADO DEL LIENZO CENTRAL ---
        function renderCanvas() {
            const canvas = document.getElementById('canvas-card');
            canvas.innerHTML = '';

            switch (currentType) {
                case 'pregunta':
                    canvas.innerHTML = `
                        <input type="text" class="input-large" placeholder="Escribe tu pregunta aquí..." id="q-title">
                        <div class="media-placeholder" onclick="triggerFileInput()">
                            <i class="fa-solid fa-image fa-2x"></i>
                            <span style="margin-top:8px;">Añadir imagen +</span>
                        </div>
                        <input type="text" class="input-large" style="font-size:1rem;" placeholder="Respuesta correcta del usuario...">
                    `;
                    break;

                case 'banderas':
                    canvas.innerHTML = `
                        <input type="text" class="input-large" placeholder="Identifica la bandera correcta de..." id="q-title">
                        <p style="text-align:center; font-weight:600; color:#555;">Sube la bandera correcta y las falsas:</p>
                        <div class="options-grid">
                            <div class="media-placeholder" style="height:100px;"><i class="fa-solid fa-flag"></i> Correcta</div>
                            <div class="media-placeholder" style="height:100px;"><i class="fa-solid fa-ban"></i> Falsa 1</div>
                            <div class="media-placeholder" style="height:100px;"><i class="fa-solid fa-ban"></i> Falsa 2</div>
                            <div class="media-placeholder" style="height:100px;"><i class="fa-solid fa-ban"></i> Falsa 3</div>
                        </div>
                    `;
                    break;

                case 'multiple':
                    canvas.innerHTML = `
                        <input type="text" class="input-large" placeholder="Escribe tu pregunta de opción múltiple..." id="q-title">
                        <div class="media-placeholder" style="height:120px;">
                            <i class="fa-solid fa-image"></i> <span>Añadir Imagen (Opcional)</span>
                        </div>
                        <div class="options-grid">
                            <div class="option-item"><input type="radio" name="opt" checked> <input type="text" placeholder="Opción 1 (Correcta)"></div>
                            <div class="option-item"><input type="radio" name="opt"> <input type="text" placeholder="Opción 2"></div>
                            <div class="option-item"><input type="radio" name="opt"> <input type="text" placeholder="Opción 3"></div>
                            <div class="option-item"><input type="radio" name="opt"> <input type="text" placeholder="Opción 4"></div>
                        </div>
                    `;
                    break;

                case 'vf':
                    canvas.innerHTML = `
                        <input type="text" class="input-large" placeholder="Escribe la afirmación..." id="q-title">
                        <div class="media-placeholder" style="height:120px;">
                            <i class="fa-solid fa-image"></i> <span>Añadir Imagen (Opcional)</span>
                        </div>
                        <div class="tf-container">
                            <button class="btn-tf selected-true" id="btn-t" onclick="toggleTF(true)">Verdadero</button>
                            <button class="btn-tf" id="btn-f" onclick="toggleTF(false)">Falso</button>
                        </div>
                    `;
                    break;

                case 'lugares':
                    canvas.innerHTML = `
                        <input type="text" class="input-large" placeholder="Haz clic en el mapa para ubicar el marcador..." id="q-title">
                        <div class="map-container" id="map" onclick="addPin(event)"></div>
                        <p style="font-size:0.85rem; color:#666; text-align:center;">Haz clic sobre el mapa para indicar el punto correcto.</p>
                    `;
                    break;

                case 'acertijos':
                    canvas.innerHTML = `
                        <input type="text" class="input-large" placeholder="Escribe la pista del acertijo..." id="q-title">
                        <div class="media-placeholder" style="height:120px;">
                            <i class="fa-solid fa-key"></i> <span>Pista Visual (Opcional)</span>
                        </div>
                        <input type="text" class="input-large" style="font-size:1rem;" placeholder="Palabra clave o respuesta del acertijo...">
                    `;
                    break;
            }
        }

        // Auxiliares de interfaz
        function toggleTF(val) {
            tfValue = val;
            const btnT = document.getElementById('btn-t');
            const btnF = document.getElementById('btn-f');
            if(val) {
                btnT.className = 'btn-tf selected-true';
                btnF.className = 'btn-tf';
            } else {
                btnT.className = 'btn-tf';
                btnF.className = 'btn-tf selected-false';
            }
        }

        function addPin(e) {
            const map = document.getElementById('map');
            const rect = map.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const existingPin = map.querySelector('.map-pin');
            if(existingPin) existingPin.remove();

            const pin = document.createElement('i');
            pin.className = 'fa-solid fa-location-dot map-pin';
            pin.style.left = `${x}px`;
            pin.style.top = `${y}px`;
            map.appendChild(pin);
        }

        function triggerFileInput() {
            alert("Simulación: Selector de imagen abierto.");
        }

        // --- CREAR SALA / GENERAR PIN ---
        function createRoom() {
            const qTitle = document.getElementById('q-title');
            if(qTitle && qTitle.value.trim() === "") {
                alert("Por favor escribe una pregunta o instrucción antes de crear la sala.");
                qTitle.focus();
                return;
            }

            // Generar PIN aleatorio XXX-XXX
            const p1 = Math.floor(100 + Math.random() * 900);
            const p2 = Math.floor(100 + Math.random() * 900);
            const pin = `${p1}-${p2}`;

            document.getElementById('modal-pin').innerText = pin;
            document.getElementById('room-modal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('room-modal').style.display = 'none';
        }