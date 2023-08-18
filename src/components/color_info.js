function iconPriorityColor(priority)
    {
        switch(priority){
            case "Low":
                return "text-lime-200 ";

            case "Medium":
                return "text-yellow-200 ";

            case "High":
                return "text-red-200 ";

                default:
                return "text-black "
        }
    }

    function textPriorityColor(priority)
    {
        switch(priority){
            case "Low":
                return "text-green-800 ";

            case "Medium":
                return "text-yellow-800 ";

            case "High":
                return "text-red-800 ";

                default:
                return "text-black "
        }
    }

    function bgPriorityColor(priority)
    {
        switch(priority){
            case "Low":
                return "bg-lime-500 ";

            case "Medium":
                return "bg-yellow-500 ";

            case "High":
                return "bg-red-500 ";

                default:
                return "bg-black "
        }
    }

export default iconPriorityColor

export {textPriorityColor,bgPriorityColor, iconPriorityColor}