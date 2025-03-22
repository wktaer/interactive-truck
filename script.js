let scene, camera, renderer, truck;

function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    const container = document.getElementById('3d-container');
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Configuración de la iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    // Posición de la cámara
    camera.position.z = 5;

    // Animación
    function animate() {
        requestAnimationFrame(animate);
        if (truck) truck.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
}

document.addEventListener('DOMContentLoaded', function() {
    const parts = document.querySelectorAll('.part');
    const infoPanel = document.getElementById('info-panel');
    const infoText = document.getElementById('info-text');
    const specsPanel = document.getElementById('specs-panel');

    // Evento para cuando se detecta un marcador
    const sceneEl = document.querySelector('a-scene');
    sceneEl.addEventListener("targetFound", event => {
        console.log("target found");
    });

    sceneEl.addEventListener("targetLost", event => {
        console.log("target lost");
    });

    parts.forEach(part => {
        part.addEventListener('click', function() {
            const info = this.getAttribute('data-info');
            infoText.textContent = info;
            showSpecifications(this.textContent);
        });
    });
});

function showSpecifications(partName) {
    const specifications = {
        'Motor': {
            'Potencia': '2,700 HP',
            'Cilindrada': '78 litros',
            'Torque máximo': '11,000 Nm',
            'Sistema de inyección': 'Common Rail electrónico'
        },
        'Tolva': {
            'Capacidad': '400 toneladas',
            'Material': 'Acero de alta resistencia',
            'Sistema de elevación': 'Hidráulico doble pistón',
            'Ángulo máximo': '45 grados'
        },
        'Ruedas': {
            'Diámetro': '3.8 metros',
            'Tipo': 'Radial para minería',
            'Presión': '100-120 PSI',
            'Vida útil': '8,000 horas'
        },
        'Cabina': {
            'Tipo': 'ROPS/FOPS',
            'Climatización': 'Automática',
            'Pantallas': 'Touch 12"',
            'Sistemas': 'GPS y Telemetría'
        }
    };

    const specs = specifications[partName];
    if (specs) {
        let specsHTML = '<h4>Especificaciones Técnicas:</h4><ul>';
        for (let key in specs) {
            specsHTML += `<li><strong>${key}:</strong> ${specs[key]}</li>`;
        }
        specsHTML += '</ul>';
        specsPanel.innerHTML = specsHTML;
    } else {
        specsPanel.innerHTML = '';
    }
}