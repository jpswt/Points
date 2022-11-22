import './App.css';
import { useState } from 'react';

function App() {
	const [points, setPoints] = useState([]);
	const [poppedPoints, setPoppedPoints] = useState([]);

	const handleClick = (e) => {
		const { clientX, clientY } = e;
		setPoints([
			...points,
			{
				x: clientX,
				y: clientY,
			},
		]);
	};

	const handleUndo = () => {
		const newPoints = [...points];
		const popped = newPoints.pop();
		if (!poppedPoints) return;
		setPoppedPoints([...poppedPoints, popped]);
		setPoints(newPoints);
	};

	const handleRedo = () => {
		const newPoints = [...points];
		const newPopped = [...poppedPoints];
		const popped = newPopped.pop();
		if (!popped) return;
		newPoints.push(popped);
		setPoints([...points, popped]);
		setPoppedPoints(newPopped);
	};

	return (
		<>
			<button disabled={points.length === 0} onClick={handleUndo}>
				Undo
			</button>
			<button disabled={poppedPoints.length === 0} onClick={handleRedo}>
				Redo
			</button>
			<div className="App" onClick={handleClick}>
				{points.map((point, idx) => (
					<div
						className="point"
						style={{ left: point.x - 10, top: point.y - 10 }}
						key={idx}
					></div>
				))}
			</div>
		</>
	);
}

export default App;
