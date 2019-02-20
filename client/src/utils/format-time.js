import moment from "moment";
import "moment-duration-format";

export const getFormattedDuration = time => {
	if (moment.duration(time).asDays() >= 1) {
		return moment.duration(time).format("h:mm:ss");
	}
	// moment imported from above, format allowed from moment-duration-format
	return moment.duration(time).format();
};

export const getFormattedTimeAgo = date => {
	return moment(date).fromNow();
};
