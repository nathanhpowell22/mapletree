import Pharmacy from "../models/Pharmacy.js";

export const getPharmacy = async (req, res) => {
  try {
    const data = await Pharmacy.find();
    const totalPharmacies = await Pharmacy.countDocuments(); // Count total pharmacies
    const totalPatientIds = await Pharmacy.countDocuments({ id: { $exists: true } }); // Count documents with an 'id' property

    const screeningsByDate = await Pharmacy.aggregate([
      {
        $group: {
          _id: "$date_screened", // Group by the `date_screened` field
          count: { $sum: 1 }, // Count the number of screenings for each date
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date in ascending order
      },
    ]);

    const dailyScreenings = await Pharmacy.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date_screened" } }, // Group by day
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by day in ascending order
      },
    ]);

    const weeklyScreenings = await Pharmacy.aggregate([
      {
        $group: {
          _id: { $isoWeek: "$date_screened" }, // Group by ISO week
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by week in ascending order
      },
    ]);

    const monthlyScreenings = await Pharmacy.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date_screened" } }, // Group by month
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ]);

    const quarterlyScreenings = await Pharmacy.aggregate([
      {
        $group: {
          _id: { $concat: [
            { $toString: { $year: "$date_screened" } },
            "-Q",
            { $toString: { $ceil: { $divide: [{ $month: "$date_screened" }, 3] } } },
          ] }, // Group by quarter
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by quarter in ascending order
      },
    ]);

    const annualScreenings = await Pharmacy.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y", date: "$date_screened" } }, // Group by year
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by year in ascending order
      },
    ]);

    res.status(200).json({
      totalPharmacies,
      totalPatientIds,
      screeningsByDate,
      dailyScreenings, // Include daily screenings count
      weeklyScreenings, // Include weekly screenings count
      monthlyScreenings, // Include monthly screenings count
      quarterlyScreenings, // Include quarterly screenings count
      annualScreenings, // Include annual screenings count
      pharmacies: data, // Include the fetched pharmacy data
    });
  } catch (error) {
    console.error("Error fetching pharmacy data:", error);
    res.status(404).json({ message: error.message });
  }
};