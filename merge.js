const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

const merge_pdf = async (condition = 1, p1, p2, pg_no = null) => {
    try {
        switch (condition) {
            // Both Pdfs All Pages
            case '1': {
                await merger.add(p1);
                await merger.add(p2);
            }
                break;
            // First PDF(All Pages) & Selected Pages of Second PDF
            case '2': {
                await merger.add(p1);
                await merger.add(p2, `${pg_no}`);
            }
                break;
            // Second PDF(All Pages) & Selected Pages of First PDF
            case '3': {
                await merger.add(p1, `${pg_no}`);
                await merger.add(p2);
            }
                break;
            default:
                break;
        }
        let d = new Date().getTime();

        // Saving File under given Name
        await merger.save(`public/${d}.pdf`);

        // Clearing Uploads for New Merge File Generation
        merger.reset(); 

        // Sending Merged PDF
        return d;
    } catch (error) {
        console.log(`Error: `, error);
    }
}

module.exports = merge_pdf;