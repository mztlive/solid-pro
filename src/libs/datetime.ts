import { CalendarDate } from "@internationalized/date"

/**
 * 获取当前月份的日期范围
 * @returns [本月第一天, 本月最后一天]
 */
export const rangeDateForCurrentMonth = (): [CalendarDate, CalendarDate] => {
	return [
		new CalendarDate(
			new Date().getFullYear(),
			new Date().getMonth() + 1,
			1,
		),
		new CalendarDate(
			new Date().getFullYear(),
			new Date().getMonth() + 1,
			new Date(
				new Date().getFullYear(),
				new Date().getMonth() + 1,
				0,
			).getDate(),
		),
	]
}

/**
 * 获取当前年份的日期范围
 * @returns [今年第一天, 今年最后一天]
 */
export const rangeDateForCurrentYear = (): [CalendarDate, CalendarDate] => {
	return [
		new CalendarDate(new Date().getFullYear(), 1, 1),
		new CalendarDate(new Date().getFullYear(), 12, 31),
	]
}

/**
 * 获取当前周的日期范围
 * @returns [本周第一天, 本周最后一天]
 */
export const rangeDateForCurrentWeek = (): [CalendarDate, CalendarDate] => {
	return [
		new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() - new Date().getDay()),
		new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() - new Date().getDay() + 6),
	]
}

/**
 * 获取当前季度的日期范围
 * @returns [本季度第一天, 本季度最后一天]
 */
export const rangeDateForCurrentQuarter = (): [CalendarDate, CalendarDate] => {
	return [
		new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 1),
		new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 31),
	]
}

/**
 * 获取指定月份的日期范围
 * @param month 月份(1-12)
 * @returns [指定月份第一天, 指定月份最后一天]
 */
export const rangeDateForMonth = (month: number): [CalendarDate, CalendarDate] => {
	return [
		new CalendarDate(new Date().getFullYear(), month, 1),
		new CalendarDate(new Date().getFullYear(), month, new Date(new Date().getFullYear(), month, 0).getDate()),
	]
}
