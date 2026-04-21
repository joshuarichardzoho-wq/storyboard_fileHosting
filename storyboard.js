// -- Interval --
//  For files up to 2 minutes, select a frame every 1 second.
//  For files up to 5 minutes, select a frame every 2 seconds.
//  For files up to 15 minutes, select a frame every 5 seconds.
//  For longer files, select a frame every 10 seconds.

// How do I calculate the image index based on the player's current time

// Imagine if the video duration is 5 mins, then interval will be 2 seconds
// so the storyboard will have total of 150 frames (5 mins = 300 seconds, 300 / 2 = 150)
// In Other words, last frame index will be 149 (0 based index)

// To find specific frame index based on current time, we can use the above scenario as example
// If the current time is 1 min (60 seconds), then we can calculate the frame index as follows:
// frame index = current time / interval
// frame index = 60 seconds / 2 seconds = 30
// So, the storyboard should display the frame at index 30 for the current time of 1 min.
// if its 0 based index, then it will be 29 (30 - 1)

// Here player.currentTime gives us the current time in seconds

var image_no = Math.ceil(player.currentTime / interval);
var image_index = image_no - 1; // Adjusting for 0-based index

// why math.ceil ?
// Math.ceil is used to round up the result to the nearest whole number. 
// This is important because we want to ensure that we are selecting the correct frame based on the current time. 
// If we were to use Math.floor, it would round down and potentially select the previous frame instead of the current one. 
// By using Math.ceil, we ensure that we are always selecting the frame that corresponds to the current time or the next one if the current time is exactly on an interval boundary.
// For example, if current time is 31s and video duration 15 mins, then interval will be 5 seconds.
// So, image index will be 31 / 5 = 6.2, and Math.ceil will round it up to 7, which means we will select the 7th image, if (0-based index) then 6th for the current time of 31 seconds. 
// If we were to use Math.floor, it would round down to 6, which would select the frame at index 5 (0-based index) instead of the correct frame at index 6.

// or

var image_index = Math.floor(player.currentTime / interval);
// why ? Imagine the current time is 2s, 2/5 = 0.4, Math.floor will round it down to 0, which means we will select the first image (0-based index) for the current time of 2 seconds.
// 5/5 = 1, Math.floor will round it down to 1, which means we will select the second image (0-based index) for the current time of 5 seconds.
// why ? becaus video duration is starts from 0, so at 0 seconds we want to show the first image (index 0), at 5 seconds we want to show the second image (index 1), and so on.


// Now how do we calculate which slide ?
// To do that, we need to find how many slides were generated up to the current time.
// above we have foound which image index we need to show, now we need to find which slide that image belongs to.
// For that
// -- if we go with image_index ( Math.floor approach) then we can calculate slide number as follows
const slide_no = Math.floor(image_index / 9) + 1; // Adding 1 to convert from 0-based index to 1-based slide number
// 1st slide will be 0 - 8 (9 images), 2nd slide will be 9 - 17 (9 images) and so on.
// so if image_index is 0, then slide_no will be 1, if image_index is 9, then slide_no will be 2, if image_index is 18, then slide_no will be 3 and so on.
// This way we can determine which slide to show based on the image_index of the video.
// if image_index  is 31, (31/9) = 3.44, Math.ceil will round it up to 4, which means we will show the 4th slide for the image_index of 31 seconds.
// But what if Math.ceil(9/9) = 1, which means we will show the 1st slide for the image_index of 9 seconds, which is incorrect because at 9 seconds we want to show the 2nd slide (0-based index) for the current time of 9 seconds.

// Now, We need find index of the image in the slide, for that we can use the following formula
const image_index_in_slide = image_index % 9; // This will give us the index of the image in the current slide (0-based index)
// For example, if image_index is 10, answer will be 1, which means we will show the 2nd image / 1st index in the current slide
// If image_index is 9, then answer will be 0, which means we will show the 1st image / 0th index in the current slide
// FYI, 1st slide will have image index 0 - 8, 2nd slide will have image index 9 - 17 and so on.
// If image_index is 27, then answer will be 0, which means we will show the 1st image/ 0th index in the current slide 

// Now how to find the row ? L3 has 3x3 grid
const row_no = Math.floor(image_index_in_slide / 3); // This will give us the row number (0-based index)
// For example, if image_index_in_slide is 0, then row_no will be 0, which means we will show the 1st row for the current slide
// If image_index_in_slide is 3, then row_no will be 1, which means we will show the 2nd row for the current slide
// if image_index_in_slide is 5, then row_no will be 1, which means we will show the 2nd row for the current slide
// If image_index_in_slide is 6, then row_no will be 2, which means we will show the 3rd row for the current slide