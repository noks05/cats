// src/CatCard.tsx

import { useEffect, useState, type ChangeEvent } from 'react'
import { useFetching } from '../../helpers/utils/useFetching'
import CatOptions from '../CatOptions/CatOptions'
import { DefaultButton } from '../DefaultButton/DefaultButton'
import styles from './index.module.css'

const options = [
	{ name: 'enabled', label: 'Включён' },
	{ name: 'refrash', label: 'Автообновление каждые 5 секунд' },
] as const

type TOptionsNames = (typeof options)[number]['name']
type TOptionStatus = Record<TOptionsNames, boolean>

const URL_CATS = 'https://api.thecatapi.com/v1/images/search'
const API_KEY =
	'live_xErBUZHyqu4NW321qw9ePkmbZMG1Jpa3Qf4jlxzTxUHKQPpn54kfI3HsBQe7ikDo'

const CatCard = () => {
	const [stateOptions, setStateOptions] = useState<TOptionStatus>({
		enabled: true,
		refrash: false,
	})

	const onChange = (e?: ChangeEvent<HTMLInputElement>) => {
		const target = e?.target as HTMLInputElement
		const newState = {
			...stateOptions,
			[target.name]: !stateOptions[target.name as keyof TOptionStatus],
		}
		setStateOptions(newState)
	}

	const { fetching, data, loading, error } = useFetching<[{ url: string }]>(
		async () => fetch(URL_CATS, { headers: { 'x-api-key': API_KEY } })
	)

	useEffect(() => {
		if (stateOptions.enabled) {
			fetching()
		}
	}, [stateOptions.enabled])

	useEffect(() => {
		if (stateOptions.refrash) {
			const interval = setInterval(() => {
				fetching()
			}, 5000)
			return () => clearInterval(interval)
		}
	}, [stateOptions.refrash])

	return (
		<div className={styles.root}>
			<CatOptions
				className={styles.options}
				options={options}
				stateOptions={stateOptions}
				onChange={onChange}
			/>

			<div>
				<DefaultButton
					className={styles.button}
					onClick={fetching}
					disabled={!stateOptions.enabled}
				>
					Получить кота
				</DefaultButton>
			</div>

			{data &&
				!error &&
				(!loading ? (
					<img
						className={styles.image}
						src={data[0]?.url || '/no-cat.jpg'}
						alt='Кот'
						width='300'
						height='300'
					/>
				) : (
					<div>loading...</div>
				))}

			{error && <div className={styles.error}>Ошибка - {error}</div>}
		</div>
	)
}

export default CatCard
