import styles from './App.module.css'
import CatCard from './components/CatCard/CatCard'

function App() {
	return (
		<div className={styles.app}>
			<h1 className={styles.title}>Прилучи котика</h1>
			<CatCard />
		</div>
	)
}

export default App
