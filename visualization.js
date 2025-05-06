document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.visualization-container');
    const canvas = document.getElementById('visualization');
    
    // Set up scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    
    // Set up camera
    const camera = new THREE.OrthographicCamera(
        -6, 6, 4, -4, 0.1, 1000
    );
    camera.position.z = 10;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // Create grid
    const gridHelper = new THREE.GridHelper(20, 20, 0xdddddd, 0xeeeeee);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);
    
    // Create axes
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    
    // Function to create a graph line
    function createGraphLine(points, color, lineWidth = 2) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
            color: color,
            linewidth: lineWidth
        });
        return new THREE.Line(geometry, material);
    }
    
    // Calculate numerical derivative
    function derivative(fn, x, h = 0.0001) {
        return (fn(x + h) - fn(x - h)) / (2 * h);
    }
    
    // Generate points for a function
    function generatePoints(fn, range = 5, step = 0.05) {
        const points = [];
        for (let x = -range; x <= range; x += step) {
            const y = fn(x);
            // Skip if y is too large for the graph
            if (Math.abs(y) > 10) continue;
            points.push(new THREE.Vector3(x, y, 0));
        }
        return points;
    }
    
    // Create tangent line
    function createTangentLine(fn, x0, length = 3) {
        const y0 = fn(x0);
        const slope = derivative(fn, x0);
        
        const points = [];
        points.push(new THREE.Vector3(x0 - length/2, y0 - slope * length/2, 0));
        points.push(new THREE.Vector3(x0 + length/2, y0 + slope * length/2, 0));
        
        return createGraphLine(points, 0xff0000, 3);
    }
    
    // Create secant line between two points
    function createSecantLine(fn, x1, x2) {
        const y1 = fn(x1);
        const y2 = fn(x2);
        
        const points = [];
        points.push(new THREE.Vector3(x1, y1, 0));
        points.push(new THREE.Vector3(x2, y2, 0));
        
        return createGraphLine(points, 0x0088ff, 2);
    }
    
    // Main function to visualize
    const mainFunction = x => Math.sin(x) * 2;
    
    // Create and add function graph
    const functionGraph = createGraphLine(
        generatePoints(mainFunction), 
        0x6366f1, 
        3
    );
    scene.add(functionGraph);
    
    // Add point for tangent
    const pointGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    scene.add(point);
    
    // Add second point for secant
    const point2Geometry = new THREE.SphereGeometry(0.1, 16, 16);
    const point2Material = new THREE.MeshBasicMaterial({ color: 0x0088ff });
    const point2 = new THREE.Mesh(point2Geometry, point2Material);
    scene.add(point2);
    
    // Add tangent line
    let tangentLine = createTangentLine(mainFunction, 0);
    scene.add(tangentLine);
    
    // Add secant line
    let secantLine = createSecantLine(mainFunction, -1, 1);
    scene.add(secantLine);
    
    // Create text for slope display
    const slopeText = document.createElement('div');
    slopeText.style.position = 'absolute';
    slopeText.style.bottom = '20px';
    slopeText.style.left = '20px';
    slopeText.style.color = '#333';
    slopeText.style.fontFamily = 'Arial, sans-serif';
    slopeText.style.fontSize = '16px';
    slopeText.style.fontWeight = 'bold';
    slopeText.style.padding = '8px 12px';
    slopeText.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    slopeText.style.borderRadius = '4px';
    slopeText.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    container.appendChild(slopeText);
    
    // Add instructions
    const instructions = document.createElement('div');
    instructions.style.position = 'absolute';
    instructions.style.top = '20px';
    instructions.style.left = '20px';
    instructions.style.color = '#333';
    instructions.style.fontFamily = 'Arial, sans-serif';
    instructions.style.fontSize = '14px';
    instructions.style.padding = '8px 12px';
    instructions.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    instructions.style.borderRadius = '4px';
    instructions.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    instructions.innerHTML = 'Click and drag to move the red point<br>See how the tangent line (derivative) changes';
    container.appendChild(instructions);
    
    // Make the point draggable
    let isDragging = false;
    let currentX = 0;
    let h = 1; // Distance between points for secant
    
    // Convert mouse position to world coordinates
    function getWorldPosition(clientX, clientY) {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((clientY - rect.top) / rect.height) * 2 + 1;
        
        // Convert to world coordinates based on camera
        const worldX = x * Math.abs(camera.right - camera.left) / 2;
        const worldY = y * Math.abs(camera.top - camera.bottom) / 2;
        
        return { x: worldX, y: worldY };
    }
    
    // Mouse events for dragging
    canvas.addEventListener('mousedown', (event) => {
        const worldPos = getWorldPosition(event.clientX, event.clientY);
        const dx = worldPos.x - point.position.x;
        const dy = worldPos.y - point.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 0.5) {
            isDragging = true;
        }
    });
    
    canvas.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const worldPos = getWorldPosition(event.clientX, event.clientY);
            currentX = Math.max(-5, Math.min(5, worldPos.x));
            updateVisualization();
        }
    });
    
    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (event) => {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            const worldPos = getWorldPosition(touch.clientX, touch.clientY);
            const dx = worldPos.x - point.position.x;
            const dy = worldPos.y - point.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 0.5) {
                isDragging = true;
                event.preventDefault();
            }
        }
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (event) => {
        if (isDragging && event.touches.length === 1) {
            const touch = event.touches[0];
            const worldPos = getWorldPosition(touch.clientX, touch.clientY);
            currentX = Math.max(-5, Math.min(5, worldPos.x));
            updateVisualization();
            event.preventDefault();
        }
    }, { passive: false });
    
    canvas.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Update the visualization based on current point position
    function updateVisualization() {
        // Update main point
        const y = mainFunction(currentX);
        point.position.set(currentX, y, 0);
        
        // Update second point for secant
        const x2 = currentX + h;
        const y2 = mainFunction(x2);
        point2.position.set(x2, y2, 0);
        
        // Remove old lines
        scene.remove(tangentLine);
        scene.remove(secantLine);
        
        // Create new tangent line
        tangentLine = createTangentLine(mainFunction, currentX);
        scene.add(tangentLine);
        
        // Create new secant line
        secantLine = createSecantLine(mainFunction, currentX, x2);
        scene.add(secantLine);
        
        // Update slope text
        const slope = derivative(mainFunction, currentX);
        slopeText.innerHTML = `Slope (Derivative): ${slope.toFixed(3)}`;
    }
    
    // Handle window resize
    function onWindowResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        const aspect = width / height;
        camera.left = -6 * aspect;
        camera.right = 6 * aspect;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }
    
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
    
    // Initial setup
    updateVisualization();
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Automatic animation for initial demonstration
    let autoAnimating = true;
    let animationTime = 0;
    
    function autoAnimate() {
        if (!autoAnimating) return;
        
        animationTime += 0.01;
        currentX = 3 * Math.sin(animationTime);
        updateVisualization();
        
        requestAnimationFrame(autoAnimate);
    }
    
    autoAnimate();
    
    // Stop auto animation when user interacts
    canvas.addEventListener('mousedown', () => {
        autoAnimating = false;
    });
    
    canvas.addEventListener('touchstart', () => {
        autoAnimating = false;
    });
});
