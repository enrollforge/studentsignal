import pool from '../lib/db';

// Comprehensive list of top U.S. colleges by enrollment
const colleges = [
  // Additional Large State Universities
  { name: "Liberty University", city: "Lynchburg", state: "VA", type: "4-year", control: "Private", total_enrollment: 110000, undergrad_enrollment: 95000, grad_enrollment: 15000, acceptance_rate: 56.0, graduation_rate: 51.0, tuition_in_state: 24910, tuition_out_state: 24910, website: "liberty.edu", programs: ["Business", "Theology", "Education", "Nursing", "Psychology"] },
  { name: "Western Governors University", city: "Salt Lake City", state: "UT", type: "4-year", control: "Private", total_enrollment: 147866, undergrad_enrollment: 120000, grad_enrollment: 27866, acceptance_rate: 100.0, graduation_rate: 42.0, tuition_in_state: 7390, tuition_out_state: 7390, website: "wgu.edu", programs: ["Business", "IT", "Education", "Nursing", "Health Sciences"] },
  { name: "Southern New Hampshire University", city: "Manchester", state: "NH", type: "4-year", control: "Private", total_enrollment: 164000, undergrad_enrollment: 135000, grad_enrollment: 29000, acceptance_rate: 95.0, graduation_rate: 41.0, tuition_in_state: 31136, tuition_out_state: 31136, website: "snhu.edu", programs: ["Business", "Education", "Liberal Arts", "STEM", "Health Sciences"] },
  { name: "University of Phoenix", city: "Phoenix", state: "AZ", type: "4-year", control: "Private", total_enrollment: 84891, undergrad_enrollment: 65000, grad_enrollment: 19891, acceptance_rate: 100.0, graduation_rate: 18.0, tuition_in_state: 9552, tuition_out_state: 9552, website: "phoenix.edu", programs: ["Business", "Nursing", "Education", "Technology", "Criminal Justice"] },
  { name: "Grand Canyon University", city: "Phoenix", state: "AZ", type: "4-year", control: "Private", total_enrollment: 103427, undergrad_enrollment: 90000, grad_enrollment: 13427, acceptance_rate: 78.0, graduation_rate: 51.0, tuition_in_state: 17800, tuition_out_state: 17800, website: "gcu.edu", programs: ["Business", "Nursing", "Education", "Engineering", "Liberal Arts"] },
  { name: "University of Houston", city: "Houston", state: "TX", type: "4-year", control: "Public", total_enrollment: 47027, undergrad_enrollment: 37251, grad_enrollment: 9776, acceptance_rate: 66.0, graduation_rate: 63.0, tuition_in_state: 11766, tuition_out_state: 27046, website: "uh.edu", programs: ["Business", "Engineering", "Law", "Optometry", "Hotel Management"] },
  { name: "University of Colorado Boulder", city: "Boulder", state: "CO", type: "4-year", control: "Public", total_enrollment: 37437, undergrad_enrollment: 31400, grad_enrollment: 6037, acceptance_rate: 84.0, graduation_rate: 72.0, tuition_in_state: 12534, tuition_out_state: 38312, website: "colorado.edu", programs: ["Engineering", "Business", "Environmental Studies", "Aerospace", "Physics"] },
  { name: "University of Iowa", city: "Iowa City", state: "IA", type: "4-year", control: "Public", total_enrollment: 32011, undergrad_enrollment: 23229, grad_enrollment: 8782, acceptance_rate: 86.0, graduation_rate: 73.0, tuition_in_state: 9830, tuition_out_state: 31569, website: "uiowa.edu", programs: ["Medicine", "Business", "Engineering", "Liberal Arts", "Pharmacy"] },
  { name: "University of Tennessee", city: "Knoxville", state: "TN", type: "4-year", control: "Public", total_enrollment: 33805, undergrad_enrollment: 25313, grad_enrollment: 8492, acceptance_rate: 68.0, graduation_rate: 73.0, tuition_in_state: 13244, tuition_out_state: 31664, website: "utk.edu", programs: ["Business", "Engineering", "Agriculture", "Veterinary Medicine", "Liberal Arts"] },
  { name: "University of Alabama", city: "Tuscaloosa", state: "AL", type: "4-year", control: "Public", total_enrollment: 38644, undergrad_enrollment: 33205, grad_enrollment: 5439, acceptance_rate: 80.0, graduation_rate: 71.0, tuition_in_state: 11900, tuition_out_state: 31460, website: "ua.edu", programs: ["Business", "Engineering", "Communication", "Education", "Nursing"] },
  { name: "University of Kentucky", city: "Lexington", state: "KY", type: "4-year", control: "Public", total_enrollment: 30545, undergrad_enrollment: 23835, grad_enrollment: 6710, acceptance_rate: 94.0, graduation_rate: 66.0, tuition_in_state: 12691, tuition_out_state: 31238, website: "uky.edu", programs: ["Business", "Engineering", "Agriculture", "Pharmacy", "Medicine"] },
  { name: "University of Missouri", city: "Columbia", state: "MO", type: "4-year", control: "Public", total_enrollment: 31304, undergrad_enrollment: 24255, grad_enrollment: 7049, acceptance_rate: 79.0, graduation_rate: 72.0, tuition_in_state: 11862, tuition_out_state: 30441, website: "missouri.edu", programs: ["Journalism", "Business", "Engineering", "Medicine", "Agriculture"] },
  { name: "University of Kansas", city: "Lawrence", state: "KS", type: "4-year", control: "Public", total_enrollment: 27690, undergrad_enrollment: 20990, grad_enrollment: 6700, acceptance_rate: 91.0, graduation_rate: 66.0, tuition_in_state: 11148, tuition_out_state: 28034, website: "ku.edu", programs: ["Business", "Engineering", "Journalism", "Pharmacy", "Architecture"] },
  { name: "University of Oklahoma", city: "Norman", state: "OK", type: "4-year", control: "Public", total_enrollment: 32676, undergrad_enrollment: 24443, grad_enrollment: 8233, acceptance_rate: 83.0, graduation_rate: 70.0, tuition_in_state: 11763, tuition_out_state: 28638, website: "ou.edu", programs: ["Business", "Engineering", "Meteorology", "Petroleum Engineering", "Liberal Arts"] },
  { name: "University of Arkansas", city: "Fayetteville", state: "AR", type: "4-year", control: "Public", total_enrollment: 30936, undergrad_enrollment: 25141, grad_enrollment: 5795, acceptance_rate: 79.0, graduation_rate: 68.0, tuition_in_state: 9656, tuition_out_state: 27410, website: "uark.edu", programs: ["Business", "Engineering", "Agriculture", "Architecture", "Education"] },
  { name: "University of Nebraska", city: "Lincoln", state: "NE", type: "4-year", control: "Public", total_enrollment: 25820, undergrad_enrollment: 20830, grad_enrollment: 4990, acceptance_rate: 78.0, graduation_rate: 68.0, tuition_in_state: 9242, tuition_out_state: 25278, website: "unl.edu", programs: ["Business", "Engineering", "Agriculture", "Journalism", "Architecture"] },
  { name: "University of Oregon", city: "Eugene", state: "OR", type: "4-year", control: "Public", total_enrollment: 23163, undergrad_enrollment: 19339, grad_enrollment: 3824, acceptance_rate: 83.0, graduation_rate: 73.0, tuition_in_state: 13290, tuition_out_state: 38415, website: "uoregon.edu", programs: ["Business", "Journalism", "Education", "Architecture", "Environmental Studies"] },
  { name: "University of Utah", city: "Salt Lake City", state: "UT", type: "4-year", control: "Public", total_enrollment: 34931, undergrad_enrollment: 26827, grad_enrollment: 8104, acceptance_rate: 89.0, graduation_rate: 68.0, tuition_in_state: 9166, tuition_out_state: 29927, website: "utah.edu", programs: ["Medicine", "Engineering", "Business", "Computer Science", "Law"] },
  { name: "University of Connecticut", city: "Storrs", state: "CT", type: "4-year", control: "Public", total_enrollment: 27412, undergrad_enrollment: 19324, grad_enrollment: 8088, acceptance_rate: 56.0, graduation_rate: 83.0, tuition_in_state: 18434, tuition_out_state: 41192, website: "uconn.edu", programs: ["Business", "Engineering", "Pharmacy", "Agriculture", "Liberal Arts"] },
  { name: "University of Delaware", city: "Newark", state: "DE", type: "4-year", control: "Public", total_enrollment: 24039, undergrad_enrollment: 19144, grad_enrollment: 4895, acceptance_rate: 74.0, graduation_rate: 82.0, tuition_in_state: 14880, tuition_out_state: 36880, website: "udel.edu", programs: ["Business", "Engineering", "Marine Science", "Chemical Engineering", "Education"] },
  { name: "Virginia Tech", city: "Blacksburg", state: "VA", type: "4-year", control: "Public", total_enrollment: 37024, undergrad_enrollment: 30457, grad_enrollment: 6567, acceptance_rate: 70.0, graduation_rate: 86.0, tuition_in_state: 13749, tuition_out_state: 32893, website: "vt.edu", programs: ["Engineering", "Architecture", "Business", "Agriculture", "Veterinary Medicine"] },
  { name: "University of Massachusetts Amherst", city: "Amherst", state: "MA", type: "4-year", control: "Public", total_enrollment: 32229, undergrad_enrollment: 24233, grad_enrollment: 7996, acceptance_rate: 64.0, graduation_rate: 82.0, tuition_in_state: 16439, tuition_out_state: 36964, website: "umass.edu", programs: ["Business", "Engineering", "Computer Science", "Public Health", "Liberal Arts"] },
  { name: "University of Pittsburgh", city: "Pittsburgh", state: "PA", type: "4-year", control: "Public", total_enrollment: 33767, undergrad_enrollment: 21210, grad_enrollment: 12557, acceptance_rate: 67.0, graduation_rate: 84.0, tuition_in_state: 19760, tuition_out_state: 34124, website: "pitt.edu", programs: ["Medicine", "Engineering", "Business", "Nursing", "Public Health"] },
  { name: "University of South Carolina", city: "Columbia", state: "SC", type: "4-year", control: "Public", total_enrollment: 35364, undergrad_enrollment: 27488, grad_enrollment: 7876, acceptance_rate: 68.0, graduation_rate: 78.0, tuition_in_state: 12688, tuition_out_state: 33928, website: "sc.edu", programs: ["Business", "Engineering", "Hospitality", "Journalism", "Public Health"] },
  { name: "Auburn University", city: "Auburn", state: "AL", type: "4-year", control: "Public", total_enrollment: 31764, undergrad_enrollment: 25948, grad_enrollment: 5816, acceptance_rate: 71.0, graduation_rate: 81.0, tuition_in_state: 11796, tuition_out_state: 31956, website: "auburn.edu", programs: ["Engineering", "Business", "Agriculture", "Veterinary Medicine", "Architecture"] },
  { name: "Clemson University", city: "Clemson", state: "SC", type: "4-year", control: "Public", total_enrollment: 27341, undergrad_enrollment: 22698, grad_enrollment: 4643, acceptance_rate: 51.0, graduation_rate: 85.0, tuition_in_state: 15374, tuition_out_state: 38550, website: "clemson.edu", programs: ["Engineering", "Business", "Agriculture", "Architecture", "Computing"] },
  { name: "Louisiana State University", city: "Baton Rouge", state: "LA", type: "4-year", control: "Public", total_enrollment: 34290, undergrad_enrollment: 28619, grad_enrollment: 5671, acceptance_rate: 76.0, graduation_rate: 70.0, tuition_in_state: 11950, tuition_out_state: 28627, website: "lsu.edu", programs: ["Business", "Engineering", "Agriculture", "Veterinary Medicine", "Mass Communication"] },
  { name: "University of Mississippi", city: "Oxford", state: "MS", type: "4-year", control: "Public", total_enrollment: 23780, undergrad_enrollment: 19849, grad_enrollment: 3931, acceptance_rate: 88.0, graduation_rate: 65.0, tuition_in_state: 9072, tuition_out_state: 26420, website: "olemiss.edu", programs: ["Business", "Pharmacy", "Journalism", "Engineering", "Liberal Arts"] },
  { name: "Mississippi State University", city: "Starkville", state: "MS", type: "4-year", control: "Public", total_enrollment: 23086, undergrad_enrollment: 18213, grad_enrollment: 4873, acceptance_rate: 75.0, graduation_rate: 63.0, tuition_in_state: 9248, tuition_out_state: 25294, website: "msstate.edu", programs: ["Engineering", "Agriculture", "Business", "Veterinary Medicine", "Architecture"] },
  { name: "University of New Mexico", city: "Albuquerque", state: "NM", type: "4-year", control: "Public", total_enrollment: 24898, undergrad_enrollment: 18872, grad_enrollment: 6026, acceptance_rate: 96.0, graduation_rate: 51.0, tuition_in_state: 7577, tuition_out_state: 24634, website: "unm.edu", programs: ["Medicine", "Engineering", "Business", "Pharmacy", "Law"] },
  { name: "University of Nevada Las Vegas", city: "Las Vegas", state: "NV", type: "4-year", control: "Public", total_enrollment: 31142, undergrad_enrollment: 26590, grad_enrollment: 4552, acceptance_rate: 85.0, graduation_rate: 45.0, tuition_in_state: 8291, tuition_out_state: 24431, website: "unlv.edu", programs: ["Hospitality", "Business", "Engineering", "Law", "Dental Medicine"] },
  { name: "University of Hawaii at Manoa", city: "Honolulu", state: "HI", type: "4-year", control: "Public", total_enrollment: 18056, undergrad_enrollment: 13166, grad_enrollment: 4890, acceptance_rate: 84.0, graduation_rate: 62.0, tuition_in_state: 11970, tuition_out_state: 34218, website: "hawaii.edu", programs: ["Marine Biology", "Astronomy", "Business", "Engineering", "Pacific Studies"] },
  { name: "University of Rhode Island", city: "Kingston", state: "RI", type: "4-year", control: "Public", total_enrollment: 18427, undergrad_enrollment: 14904, grad_enrollment: 3523, acceptance_rate: 76.0, graduation_rate: 69.0, tuition_in_state: 14566, tuition_out_state: 32578, website: "uri.edu", programs: ["Pharmacy", "Engineering", "Business", "Marine Science", "Nursing"] },
  { name: "University of Vermont", city: "Burlington", state: "VT", type: "4-year", control: "Public", total_enrollment: 13737, undergrad_enrollment: 11136, grad_enrollment: 2601, acceptance_rate: 67.0, graduation_rate: 78.0, tuition_in_state: 18890, tuition_out_state: 43890, website: "uvm.edu", programs: ["Business", "Engineering", "Medicine", "Environmental Studies", "Agriculture"] },
  { name: "University of Maine", city: "Orono", state: "ME", type: "4-year", control: "Public", total_enrollment: 11741, undergrad_enrollment: 9465, grad_enrollment: 2276, acceptance_rate: 94.0, graduation_rate: 59.0, tuition_in_state: 11640, tuition_out_state: 33240, website: "umaine.edu", programs: ["Engineering", "Business", "Marine Science", "Forestry", "Education"] },
  { name: "University of Wyoming", city: "Laramie", state: "WY", type: "4-year", control: "Public", total_enrollment: 11829, undergrad_enrollment: 9600, grad_enrollment: 2229, acceptance_rate: 96.0, graduation_rate: 58.0, tuition_in_state: 5775, tuition_out_state: 17955, website: "uwyo.edu", programs: ["Engineering", "Business", "Agriculture", "Pharmacy", "Law"] },
  { name: "University of Montana", city: "Missoula", state: "MT", type: "4-year", control: "Public", total_enrollment: 9955, undergrad_enrollment: 8401, grad_enrollment: 1554, acceptance_rate: 95.0, graduation_rate: 48.0, tuition_in_state: 7488, tuition_out_state: 27918, website: "umt.edu", programs: ["Forestry", "Journalism", "Business", "Pharmacy", "Wildlife Biology"] },
  { name: "University of Idaho", city: "Moscow", state: "ID", type: "4-year", control: "Public", total_enrollment: 11507, undergrad_enrollment: 9544, grad_enrollment: 1963, acceptance_rate: 74.0, graduation_rate: 59.0, tuition_in_state: 8304, tuition_out_state: 26568, website: "uidaho.edu", programs: ["Engineering", "Agriculture", "Business", "Natural Resources", "Law"] },
  { name: "University of North Dakota", city: "Grand Forks", state: "ND", type: "4-year", control: "Public", total_enrollment: 13886, undergrad_enrollment: 10838, grad_enrollment: 3048, acceptance_rate: 83.0, graduation_rate: 56.0, tuition_in_state: 9093, tuition_out_state: 13543, website: "und.edu", programs: ["Aviation", "Medicine", "Engineering", "Business", "Nursing"] },
  { name: "University of South Dakota", city: "Vermillion", state: "SD", type: "4-year", control: "Public", total_enrollment: 9491, undergrad_enrollment: 7321, grad_enrollment: 2170, acceptance_rate: 99.0, graduation_rate: 57.0, tuition_in_state: 9321, tuition_out_state: 12888, website: "usd.edu", programs: ["Business", "Medicine", "Law", "Education", "Health Sciences"] },
  { name: "University of Alaska Fairbanks", city: "Fairbanks", state: "AK", type: "4-year", control: "Public", total_enrollment: 7403, undergrad_enrollment: 5803, grad_enrollment: 1600, acceptance_rate: 68.0, graduation_rate: 32.0, tuition_in_state: 8522, tuition_out_state: 25922, website: "uaf.edu", programs: ["Engineering", "Natural Resources", "Arctic Studies", "Fisheries", "Geophysics"] },
  { name: "West Virginia University", city: "Morgantown", state: "WV", type: "4-year", control: "Public", total_enrollment: 26839, undergrad_enrollment: 21432, grad_enrollment: 5407, acceptance_rate: 88.0, graduation_rate: 60.0, tuition_in_state: 9360, tuition_out_state: 26568, website: "wvu.edu", programs: ["Engineering", "Business", "Medicine", "Pharmacy", "Journalism"] }
];

async function importMoreColleges() {
  const client = await pool.connect();
  
  try {
    console.log('Starting import of additional colleges...');
    
    let imported = 0;
    
    for (const college of colleges) {
      try {
        await client.query(`
          INSERT INTO colleges (
            name, city, state, type, control, 
            total_enrollment, undergrad_enrollment, grad_enrollment,
            acceptance_rate, graduation_rate,
            tuition_in_state, tuition_out_state,
            website, programs
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        `, [
          college.name,
          college.city,
          college.state,
          college.type,
          college.control,
          college.total_enrollment,
          college.undergrad_enrollment,
          college.grad_enrollment,
          college.acceptance_rate,
          college.graduation_rate,
          college.tuition_in_state,
          college.tuition_out_state,
          college.website,
          college.programs
        ]);
        
        imported++;
        if (imported % 10 === 0) {
          console.log(`Imported ${imported} colleges...`);
        }
      } catch (err: any) {
        if (err.code !== '23505') { // Ignore duplicate key errors
          console.error(`Error importing ${college.name}:`, err.message);
        }
      }
    }
    
    console.log(`Successfully imported ${imported} additional colleges!`);
    
    // Get total count
    const result = await client.query('SELECT COUNT(*) FROM colleges');
    console.log(`Total colleges in database: ${result.rows[0].count}`);
    
  } catch (error) {
    console.error('Error importing colleges:', error);
    throw error;
  } finally {
    client.release();
  }
}

importMoreColleges()
  .then(() => {
    console.log('Import complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });
