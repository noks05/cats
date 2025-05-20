import { useState } from 'react'

export const useFetching = <T>(cb: () => Promise<Response>) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [data, setData] = useState<T | []>([])

	const fetching = async () => {
		setLoading(true)
		try {
			const response = await cb()
			const data = await response.json()
			console.log('data = ', data)
			setData(data)
		} catch (error: unknown) {
			console.error('Ошибка при получении кота:', error)

			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('Неизвестная ошибка')
			}
		} finally {
			setLoading(false)
		}
	}

	return { fetching, data, loading, error }
}
