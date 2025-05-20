import clsx from 'clsx'
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styles from './index.module.css'

interface IDefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export const DefaultButton: FC<IDefaultButtonProps> = ({
	className,
	onClick,
	children,
	...restProps
}) => {
	return (
		<button
			className={clsx(styles.root, className)}
			onClick={onClick}
			{...restProps}
		>
			{children}
		</button>
	)
}
