import { asyncHandler } from '../utils/asyncHandler.js';

const ragisterUser = asyncHandler(async (req, res) => {
    res.status(200).json(
        {
            message: 'User registered successfully OK^ '
        }
    );
});

export { ragisterUser };