// src/CatOptions.tsx

import clsx from 'clsx'
import { type ChangeEvent, type FC, type InputHTMLAttributes } from 'react'
import styles from './index.module.css'

interface Option extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	label: string
}

interface CatOptionsProps {
	className?: string
	options: readonly Option[]
	stateOptions: Record<string, boolean>
	onChange: (e?: ChangeEvent<HTMLInputElement>) => void
}

const CatOptions: FC<CatOptionsProps> = ({
	options,
	className,
	stateOptions,
	onChange,
}) => {
	return (
		<div className={clsx(className, styles.optionList)}>
			{options.map(({ name, label, ...restProps }) => (
				<label className={styles.optionItem} key={name}>
					<input
						type='checkbox'
						name={name}
						checked={stateOptions[name]}
						onChange={onChange}
						{...restProps}
					/>
					<p>{label}</p>
				</label>
			))}
		</div>
	)
}

export default CatOptions
