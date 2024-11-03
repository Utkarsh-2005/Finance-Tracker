const dataParserForItems = (items) => {
    const body = items.map((item) => [
        item.id.toString(),
        new Date(item.date).toLocaleDateString(), // Format date to readable format
        item.amount.toString(),
        item.category
    ]);

    const total = items.reduce((sum, item) => sum + item.amount, 0);

    return { body, total };
}
module.exports = dataParserForItems