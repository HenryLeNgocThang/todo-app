module.exports = function(array = [], target_number) {
    return array.reduce(function (prev, curr) {
        return (Math.abs(curr - target_number) < Math.abs(prev - target_number) ? curr : prev);
    });
}