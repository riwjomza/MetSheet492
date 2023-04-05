import { stringLength } from "@firebase/util";
import {ChangeEventHandler, FC} from "react"
import {useState} from "react"
import LiveSearch from "../../pages/patient-history/components/LiveSearch"

interface Props {}

const profiles =[
    {id:"1", name: "Antacids and other drugs for dyspepsia Aluminium hydroxide + magnesium hydroxide +simeticone "},
    {id:"2", name: "Compound Cardamom Mixture (Mist Carminative) เฉพาะสูตรที่ไม่ มี sodium bicarbonate    "},
    {id:"3", name: "Simethicone"},
    {id:"4", name: "Domperidone maleate "},
    {id:"5", name: "Hyoscine-n-butylbromide"},
    {id:"6", name: "Metoclopamide"},
    {id:"7", name: "Omeprazole"},
    {id:"8", name: "Ranitidine HCl"},
    {id:"9", name: "Omeprazole"},
    {id:"10", name: "Ranitidine HCl    "},
    {id:"11", name: "Octreotide acetate"},
    {id:"12", name: "Misoprostol"},
    {id:"13", name: "Oral hydrate solution"},
    {id:"14", name: "Loperamide hydrochloride"},
    {id:"15", name: "ฟ้าทะลายโจร ประกอบด้วย ผงฟ้าทะลายโจรแหง้ 500 มิลลิกรัม"},
    {id:"16", name: "Glycerol"},
    {id:"17", name: "Magnesium hydroxide (milk of magnesia)"},
    {id:"18", name: "Senna (extract)(standadised senna equivalent to 7.5 mg total sennosides)"},
    {id:"19", name:"Lactulose"},
    {id:"20", name:"Sodium phosphates (sodium biphosphate 0.9 g)"},
    {id:"21", name:"Sodium phosphates (sodium phosphate 2.4 g)"},
    {id:"22", name:"Liquid paraffin"},
    {id:"23", name:"Sodium chloride enema"},
    {id:"24", name:"Local anesthetic + Corticoteroid + with or without astringent"},
    {id:"25", name:"เพชรสังฆาต"},
    {id:"26", name:"Diosmin + heperidine"},
    {id:"27", name:"igoxin"},
    {id:"28", name:"Furosemide"},
    {id:"29", name:"Hydrochlorothiazide"},
    {id:"30", name:"Mannitol"},
    {id:"31", name:"Spironolactone"},
    {id:"32", name:"Amiloride HCl + hydrochlorothiazide"},
    {id:"33", name:"Adrenosine"},
    {id:"34", name:"Atropine sulfate"},
    {id:"35", name:"Magnesium sulfate"},
    {id:"36", name:"Amiodarone hydrochloride"},
    {id:"37", name:"Atenolol"},
    {id:"38", name:"hydrochloride"},
    {id:"39", name:"Carvedilol"},
    {id:"40", name:"Hydralazine HCl"},
    {id:"41", name:"Methyldopa"},
    {id:"42", name:"Doxazosin mesilate"},
    {id:"43", name:"Enalapril maleate"},
    {id:"44", name:"Captopril"},
    {id:"45", name:"Losartan potassium"},
    {id:"46", name:"Glyceryl trinitrate"},
    {id:"47", name:"Isosorbide dinitrate"},
    {id:"48", name:"Isosorbide mononitrate"},
    {id:"49", name:"Amlodipine besilate"},
    {id:"50", name:"Verapamil hydrochloride"},
    {id:"51", name:"Manidipine hydrochloride"},
    {id:"52", name:"Nicardipine HCl"},
    {id:"53", name:"Nifedipine (sustained release)"},
    {id:"54", name:"Dopamine"},
    {id:"55", name:"Dobutamine HCl"},
    {id:"56", name:"Norepinephrine (Nor- adrenaline)"},
    {id:"57", name:"Ephedrine"},
    {id:"58", name:"Epinephrine (Adrenaline)"},
    {id:"59", name:"Wafarin sodium"},
    {id:"60", name:"Heparin sodium"},
    {id:"61", name:"Enoxaparin sodium"},
    {id:"62", name:"Aspirin (Acetylsalicylic acid)"},
    {id:"63", name:"Clopidogrel bisulfate"},
    {id:"64", name:"Streptokinase"},
    {id:"65", name:"Tranexamic acid"},
    {id:"66", name:"Gemfibrozil"},
    {id:"67", name:"Simvastatin"},
    {id:"68", name:"Fenofibrate"},
    {id:"69", name:"Atorvastatin"},
    {id:"70", name:"Salbutamol sulfate"},
    {id:"72", name:"Terbutaline sulfate"},
    {id:"73", name:"Salbutamol sulfate"},
    {id:"74", name:"Ipratropium bromide + Fenoterol hydrobromide"},
    {id:"75", name:"Aminophylline"},
    {id:"76", name:"Theophylline (sustained release)"},
    {id:"77", name:"Budesonide"},
    {id:"78", name:"Fluticasone + salmeterol"},
    {id:"79", name:"Montelukast sodium"},
    {id:"80", name:"Chlorpheniramine maleate"},
    {id:"81", name:"Hydroxyzine"},
    {id:"82", name:"Cetirizine hydrochloride"},
    {id:"83", name:"Phospholipids"},
    {id:"84", name:"Dextromethophan hydrobromide"},
    {id:"85", name:"Opium and glycerrhiza Mixture compound (M. Tussis; Brown Mixture)"},
    {id:"86", name:"Ammonium carbonate +glycerrhiza"},
    {id:"87", name:"Glyceryl guaiacolate"},
    {id:"88", name:"Bromhexine"},
    {id:"89", name:"ยาประสะมะแว้ง"},
    {id:"90", name:"Phenylephrine HCl + Brompheniramine maleate"},
    {id:"91", name:"Aromatic Ammonia spirit"},
    {id:"92", name:"ฟ้าทะลายโจร ประกอบด้วย ผงฟ้าทะลายโจรแหง้ 500 มิลลิกรัม"},
    {id:"93", name:"Chloral hydrate"},
    {id:"94", name:"Diazepam"},
    {id:"95", name:"Lorazepam"},
    {id:"96", name:"Clonazepam"},
    {id:"97", name:"Dipotassium clorazepate"},
    {id:"98", name:"Hydroxyzine"},
    {id:"99", name:"Alprazolam"},
    {id:"100", name:"Chlorpromazine HCl"},
    {id:"101", name:"Fluphenazine decanoate"},
    {id:"102", name:"Haloperidol"},
    {id:"103", name:"Perphenazine"},
    {id:"104", name:"Trifluoperazine hydrochloride"},
    {id:"105", name:"Clozapine"},
    {id:"106", name:"Flupentixol(asdecanoate)"},
    {id:"107", name:"Risperidone"},
    {id:"108", name:"Thioridazine"},
    {id:"109", name:"Amobarbital + chlorpromazine"},
    {id:"110", name:"Carbamazepine"},
    {id:"111", name:"Lithium carbonate"},
    {id:"112", name:"Sodium valproate EC tablet 200 mg"},
    {id:"113", name:"Sodium valproate Oral solution 200 mg/ml"},
    {id:"114", name:"Sodium valproate SR tablet 500 mg"},
    {id:"115", name:"Amitriptyline hydrochloride"},
    {id:"116", name:"Fluoxetine HCl"},
    {id:"117", name:"Imipramine"},
    {id:"118", name:"Nortriptyline HCL"},
    {id:"119", name:"Sertraline"},
    {id:"120", name:"Trazodone HCl"},
    {id:"121", name:"Domperidone maleate"},
    {id:"122", name:"Metoclopamide"},
    {id:"123", name:"Ondansetron"},
    {id:"124", name:"Dimenhydrinate"},
    {id:"125", name:"Betahistine mesilate (Betahistine mesylate)"},
    {id:"126", name:"Acetaminophen (paracetamol)"},
    {id:"127", name:"Aspirin (Acetylsalicylic acid)"},
    {id:"128", name:"Ibuprofen"},
    {id:"129", name:"Fentanyl citrate"},
    {id:"130", name:"Methadone hydrochloride"},
    {id:"131", name:"Morphine sulfate"},
    {id:"132", name:"Pethidine hydrochloride"},
    {id:"133", name:"Tramadol hydrochloride"},
    {id:"134", name:"Amitriptyline hydrochloride"},
    {id:"135", name:"Carbamazepine"},
    {id:"136", name:"Nortriptyline hydrochloride"},
    {id:"137", name:"Gabapentin"},
    {id:"138", name:"Acetaminophen (paracetamol)"},
    {id:"139", name:"Aspirin"},
    {id:"140", name:"Ibuprofen"},
    {id:"141", name:"Ergotamine tartrate + caffeine"},
    {id:"142", name:"Amitriptyline HCl"},
    {id:"143", name:"Propanolol HCl"},
    {id:"144", name:"Cyproheptadine HCl"},
    {id:"145", name:"Sodium valproate"},
    {id:"146", name:"Carbamazepine"},
    {id:"147", name:"Magnesium sulfate"},
    {id:"148", name:"Phenobarbital"},
    {id:"149", name:"Phenytoin base"},
    {id:"150", name:"Phenytoin sodium"},
    {id:"151", name:"Sodium valproate"},
    {id:"152", name:"Clonazepam"},
    {id:"153", name:"Sodium valproate"},
    {id:"154", name:"Diazepam"},
    {id:"155", name:"Phenobabital sodium"},
    {id:"156", name:"Phenytoin sodium"},
    {id:"157", name:"Midazolam Hydrochloride"},
    {id:"158", name:"Diazepam"},
    {id:"159", name:"Levodopa + Carbidopa as monohydrate"},
    {id:"160", name:"Propanolol"},
    {id:"161", name:"Trihexyphenidyl HCl"},
    {id:"162", name:"Baclofen"},
    {id:"163", name:"Clonazepam"},
    {id:"164", name:"Nortriptyline hydrochloride"},
    {id:"165", name:"Amoxicillin trihydrate"},
    {id:"166", name:"Ampicillin sodium"},
    {id:"167", name:"Cloxacillin sodium"},
    {id:"168", name:"Dicloxacillin sodium"},
    {id:"169", name:"Penicillin G sodium (benzylpenicillin)"},
    {id:"170", name:"Phenoxymethylpenicillin potassium (penicillin V)"},
    {id:"171", name:"Benzathine benzylpenicillin (Penicillin G benzathine)"},
    {id:"172", name:"Amoxicillin trihydrate + Clavulanate potassium (Co-amoxiclav)"},
    {id:"173", name:"Piperacillin sodium+ Tazobactam sodium"},
    {id:"174", name:"Cefazolin sodium"},
    {id:"175", name:"Cefotaxim sodium"},
    {id:"176", name:"Ceftaxidime sodium"},
    {id:"177", name:"Ceftriaxone sodium"},
    {id:"178", name:"Cefixime"},
    {id:"179", name:"Cefoperazone sod. + salbactam sod"},
    {id:"180", name:"Meropenam"},
    {id:"181", name:"Doxycycline hyclate (HCl)"},
    {id:"182", name:"Gentamicin sulfate"},
    {id:"183", name:"Amikacin sulfate"},
    {id:"184", name:"Erythromycin estolate"},
    {id:"185", name:"Roxitromycin"},
    {id:"186", name:"Azithromycin"},
    {id:"187", name:"Clarithromycin"},
    {id:"188", name:"Norfloxacin"},
    {id:"189", name:"Ciprofloxacin HCl"},
    {id:"190", name:"Ciprofloxacin"},
    {id:"191", name:"Metronidazole"},
    {id:"192", name:"Clindamycin phosphate"},
    {id:"193", name:"Chloramphenicol sodium succinate"},
    {id:"194", name:"Colistimethate sodium (sodium colistinmethanesulphonate)"},
    {id:"195", name:"Vancomycin HCl"},
    {id:"196", name:"Sulfamethoxazole + trimethoprim (cotrimoxazole)"},
    {id:"197", name:"Ethambutol HCl"},
    {id:"198", name:"Isoniazid"},
    {id:"199", name:"Pyrazinamide"},
    {id:"200", name:"Rifampicin"},
    {id:"201", name:"Streptomycin sulfate"},
    {id:"202", name:"Isoniazid + Rifampicin + Pyrazinamide"},
    {id:"203", name:"Isoniazid + Rifampicin"},
    {id:"204", name:"Isoniazid + Rifampicin + Pyrazinamide + Etambutol HCl"},
    {id:"205", name:"Amikacin sulfate"},
    {id:"206", name:"Cycloserine"},
    {id:"207", name:"Para-aminocalicylic acid (PAS)"},
    {id:"208", name:"Kanamycin sulfate"},
    {id:"209", name:"Ofloxacin"},
    {id:"210", name:"Levofloxacin hemihydrate"},
    {id:"211", name:"Dapsone"},
    {id:"212", name:"Fluconazole"},
    {id:"213", name:"Griseofluvin"},
    {id:"214", name:"Nystatin"},
    {id:"215", name:"Itraconazole"},
    {id:"216", name:"Amphotericin B"},
    {id:"217", name:"Aciclovir (Acyclovir)"},
    {id:"218", name:"Oseltamivir phosphate"},
    {id:"219", name:"Acyclovir"},
    {id:"220", name:"Efavirenz"},
    {id:"221", name:"Lamivudine (3TC)"},
    {id:"222", name:"Nevirapine"},
    {id:"223", name:"Tenofovia disoproxil fumarate"},
    {id:"224", name:"Tenofovir Disoproxil Fumarate + Emtricitabine"},
    {id:"225", name:"Tenofovir Disoproxil Fumarate + Emtricitabine+ Efavirenz"},
    {id:"226", name:"Zidovudine (AZT)"},
    {id:"227", name:"Zidovudine + Lamivudine"},
    {id:"228", name:"Zidovudine + Lamivudine + nevirapine"},
    {id:"229", name:"Lamivudine + stavudine + nevirapine"},
    {id:"230", name:"Stavudine"},
    {id:"231", name:"Atazanavir sulfate"},
    {id:"232", name:"Lopinavir + Ritonavir"},
    {id:"233", name:"Ritonavir"},
    {id:"234", name:"Abacavir (ABC)"},
    {id:"235", name:"Didanosine (ddI)"},
    {id:"236", name:"Indinavir sulfate"},
    {id:"237", name:"Lamivudine (3TC)"},
    {id:"238", name:"Tenofovir disoproxil fumarate"},
    {id:"239", name:"Chloroquine phosphate"},
    {id:"240", name:"Primaquine phosphate"},
    {id:"241", name:"Quinine"},
    {id:"242", name:"Artesunate"},
    {id:"243", name:"Mefloquine hydrochloride"},
    {id:"244", name:"Metronidazole"},
    {id:"245", name:"Pyrimethamine"},
    {id:"246", name:"Sulfadiazine"},
    {id:"247", name:"Albendazole"},
    {id:"248", name:"Diethylcarbamazine citrate"},
    {id:"249", name:"Praziquantel"},
    {id:"250", name:"Chlorhexidine gluconate"},
    {id:"251", name:"Ethyl alcohol"},
    {id:"252", name:"Gential violet"},
    {id:"253", name:"Hydrogen peroxide"},
    {id:"254", name:"Povidone-iodine"},
    {id:"255", name:"Chlorhexidine gluconate"},
    {id:"256", name:"Biphasic isophane insulin"},
    {id:"257", name:"Isophane insulin (NPH)"},
    {id:"258", name:"Soluble insulin (Neutral insulin ; insulin injection)"},
    {id:"259", name:"Insulin glargine"},
    {id:"260", name:"Glibenclamide"},
    {id:"261", name:"Glipizide"},
    {id:"262", name:"Metformin hydrochloride"},
    {id:"263", name:"Pioglitazone hydrochloride"},
    {id:"264", name:"Levothyroxine sodium (L- thyroxine sodium)"},
    {id:"265", name:"Propylthiouracil"},
    {id:"266", name:"Thiamazole (Methimazole)"},
    {id:"267", name:"Dexamethasone"},
    {id:"268", name:"Hydrocortisone"},
    {id:"269", name:"Prednisolone"},
    {id:"270", name:"Triamcinolone acetonide"},
    {id:"271", name:"Norethisterone"},
    {id:"272", name:"Conjugated estrogen"},
    {id:"273", name:"Estradiol valerate+Norgestril"},
    {id:"274", name:"Methylergometrine maleate"},
    {id:"275", name:"Oxytocin"},
    {id:"276", name:"Indomethacin sodium"},
    {id:"277", name:"Sulprostone"},
    {id:"278", name:"Terbutaline sulfate"},
    {id:"279", name:"Clotrimazole"},
    {id:"280", name:"Etonogestrel"},
    {id:"281", name:"Ethinylestradiol + Levonorgestrel"},
    {id:"282", name:"Levonorgestrel"},
    {id:"283", name:"Medroxyprogesterone acetate"},
    {id:"284", name:"Lynestrenol"},
    {id:"285", name:"Doxazosin mesilate"},
    {id:"286", name:"Finasteride"},
    {id:"287", name:"Oxybutynin hydrochloride"},
    {id:"288", name:"Methotrexate"},
    {id:"289", name:"Dexamethasone sodium phosphate"},
    {id:"290", name:"Prednisolone"},
    {id:"291", name:"Fresh frozen plasma"},
    {id:"292", name:"Leukocyte depleted packed red cell"},
    {id:"293", name:"Packed red cell"},
    {id:"294", name:"Platelet concentration single donor"},
    {id:"295", name:"Whole blood"},
    {id:"296", name:"Folic acid"},
    {id:"297", name:"Deferoxaminemesilate (Desferrioxaminemesilate)"},
    {id:"298", name:"Deferiprone"},
    {id:"299", name:"Epoetin alfa (epoetin alpha)"},
    {id:"300", name:"Glucose with or with out sodium chloride"},
    {id:"301", name:"Intermittent peritoneal dialysis"},
    {id:"302", name:"Sodium bicarbonate"},
    {id:"303", name:"Potassium chloride"},
    {id:"304", name:"Sodium lactate intravenous infusion compound"},
    {id:"305", name:"Water for injection"},
    {id:"306", name:"Sodium chloride"},
    {id:"307", name:"Calcium polystyrene sulfonate"},
    {id:"308", name:"Acetate Ringer solution"},
    {id:"309", name:"Hydroxyethyl starch"},
    {id:"310", name:"Folic acid"},
    {id:"311", name:"Vitamin B1"},
    {id:"312", name:"Vitamin B6"},
    {id:"313", name:"Vitamin C"},
    {id:"314", name:"Vitamin K1 (Phytomenadione"},
    {id:"315", name:"Multivitamin"},
    {id:"316", name:"Vitamin E"},
    {id:"317", name:"Alfacalcido (1-alpha-hydroxyvitamin D3)"},
    {id:"318", name:" Vitamin B complex "},
    {id:"319", name:" Vitamin B 1-6-12 "},
    {id:"320", name:" Dextrose solution with minerals and electrolytes"},
    {id:"321", name:"Fat emulsion "},
    {id:"322", name:"Calcium gluconate"},
    {id:"323", name:"Magnesium sulfate"},
    {id:"324", name:"Ferrous fumarate"},
    {id:"325", name:"Ferrous fumarate"},
    {id:"326", name:"Folic acid"},
    {id:"327", name:"Ferrous salt + Folic acid + Potassium Iodide"},
    {id:"328", name:"Aspirin"},
    {id:"329", name:"Diclofenac sodium"},
    {id:"340", name:"Ibuprofen"},
    {id:"341", name:"Naproxen"},
    {id:"342", name:"Piroxicam"},
    {id:"343", name:"Mefenamic acid"},
    {id:"344", name:"Chloroquine phosphate"},
    {id:"345", name:"Hydroxychloroquine sulfate"},
    {id:"346", name:"Methotrexate"},
    {id:"347", name:"Colchicin"},
    {id:"348", name:"Allopurinol "},
    {id:"349", name:"Neostigmine methylsulfate"},
    {id:"350", name:"Diazepam"},
    {id:"351", name:"Baclofen"},
    {id:"352", name:"Tolperisone"},
    {id:"353", name:"Methyl Salicylate cream compound"},
    {id:"354", name:"Chloramphenicol"},
    {id:"355", name:"Chlortetracycline HCl"},
    {id:"356", name:"Dexamethasone sodium phosphate + Neomycin sulfate"},
    {id:"357", name:"Antazoline HCl + tetrahydrozoline HCl"},
    {id:"358", name:"Tetracaine HCl"},
    {id:"359", name:"Hydroxypropyl methylcellulose USP"},
    {id:"360", name:"Chloramphenicol"},
    {id:"361", name:"Dexamethasone + Framycetin sulfate + Gramicidin"},
    {id:"362", name:"Dexamethasone sodium phosphate + Neomycin sulfate"},
    {id:"363", name:"Gentian violet"},
    {id:"364", name:"Ofloxacin"},
    {id:"365", name:"Budesonide"},
    {id:"366", name:"Sodium chloride"},
    {id:"367", name:"Oxymetazoline hydrochloride"},
    {id:"368", name:"Borax (in glycerin)"},
    {id:"369", name:"Chlorhexidine gluconate"},
    {id:"370", name:"Triamcinolone scetonide"},
    {id:"371", name:"Clotrimazole"},
    {id:"372", name:"Nystatin"},
    {id:"373", name:"Clove oil"},
    {id:"374", name:"Chlorhexidine gluconate"},
    {id:"375", name:"Epinephrine (Adrenaline)"},
    {id:"376", name:"Zinc oxide + Zinc acetate"},
    {id:"377", name:"Silver sulfadiazine"},
    {id:"378", name:"Mupirocin"},
    {id:"379", name:"Benzoic acid + salicylic acid (Whitefield’s ointment)"},
    {id:"380", name:"Clotrimazole"},
    {id:"381", name:"Benzyl benzoate"},
    {id:"382", name:"Olive oil"},
    {id:"383", name:"White petrolatum (Vasline)"},
    {id:"384", name:"Zinc oxide"},
    {id:"385", name:"Calamide"},
    {id:"386", name:"Betamethasone valerate"},
    {id:"387", name:"Triamcinolone acetonide"},
    {id:"388", name:"Clobetasol propioate"},
    {id:"389", name:"Coal tar"},
    {id:"390", name:"Methotrexate"},
    {id:"391", name:"Podophyllin (Podophyllum resin)"},
    {id:"392", name:"Silver nitrate"},
    {id:"393", name:"Anti-D immunoglobulin"},
    {id:"394", name:"BCG vaccine"},
    {id:"395", name:"Diphtheria – tetanus vaccine"},
    {id:"396", name:"Diphtheria – tetanus – pertussis vaccine"},
    {id:"397", name:"Diphtheria – tetanus – pertussis-Hepatitis B vaccine (DTP-HB)"},
    {id:"398", name:"Hepatitis B vaccine"},
    {id:"399", name:"Influenza vaccine (trivalent)"},
    {id:"400", name:"Influenza vaccine  (pandemic influenza)"},
    {id:"401", name:"Japanese encephalitis vaccine, inactivated (inactivated JE vaccine)"},
    {id:"402", name:"Measle – Mump – Rebella vaccine (MMR)"},
    {id:"403", name:"Poliomyelitis vaccine live"},
    {id:"404", name:"attenuated (bivalent,trivalent)"},
    {id:"405", name:"Rabies immunoglobulin, horse Inj (ERIG)"},
    {id:"406", name:"Rabies vaccines"},
    {id:"407", name:"Tetanus toxoid (Tetanus Inj vaccine)"},
    {id:"408", name:"Tetanus antitoxin, human (Anti-tetanus immunoglobulin, human)"},   
    {id:"409", name:"Hepatitis B immunoglobulin, human (HBIG)"},
    {id:"410", name:"Inactivated polio vaccine (IPV)"},
    {id:"411", name:"Propofol"},
    {id:"412", name:"Thaiopental sodium (Thaiopentone sodium)"},
    {id:"413", name:"Ketamine HCl"},
    {id:"414", name:"Sevoflurane"},
    {id:"415", name:"Desflurane"},
    {id:"416", name:"Cisatracurium bromide"},
    {id:"417", name:"Pancuronium bromide"},
    {id:"418", name:"Diazepam"},
    {id:"419", name:"Fentanyl citrate"},
    {id:"420", name:"Morphine sulfate"},
    {id:"421", name:"Pethidine hydrochloride"},
    {id:"422", name:"Midazolam Hydrochloride"},
    {id:"423", name:"Atropine sulfate"},
    {id:"424", name:"Neostigmine methylsulfate"},
    {id:"425", name:"Lidocaine HCI"},
    {id:"426", name:"Mepivacaine HCl"},
    {id:"427", name:"Bupivacine HCI"},
    {id:"428", name:"Lidocaine HCl + Epinephrine"},
    {id:"429", name:"Acetylcysteine (N-acetylcysteine)"},
    {id:"430", name:"Antivenom sera"},
    {id:"431", name:"Polyvalent antivenom for hematotoxin"},
    {id:"432", name:"Polyvalent antivenom for neurotoxin"},
    {id:"433", name:"Atropine sulfate"},
    {id:"434", name:"Calcium gluconate"},
    {id:"435", name:"Charcoal, activated"},
    {id:"436", name:"Naloxone HCl"},
    {id:"437", name:"Sodium bicarbonate"},
    {id:"438", name:"Vitamin K1 (Phytomenadion)"},
    {id:"439", name:"Deferoxaminemesilate (Desferrioxamine mesilate)"},
    {id:"440", name:"Sodium nitrite"},
    {id:"441", name:"Sodium thiosulfate"},
    {id:"442", name:"Calcium folinate"},
    {id:"443", name:"Methylene blue (Methylthioninium chloride)"},
    {id:"444", name:"Norepinephrine (Noradrenaline)"},
    {id:"445", name:"Phenobarbital sodium (Phenobarbitone sodium)"},
    {id:"446", name:"Iopamidol"},


];



// const drugName: FC<Props> = (props): JSX.Element => {
//     const [results, setResults] = useState<{ id: string; name: string }[]>();
//   const [selectedProfile, setSelectedProfile] = useState<{
//     id: string;
//     name: string;
//   }>();

//   type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
//   const handleChange: changeHandler = (e) => {
//     const { target } = e;
//     if (!target.value.trim()) return setResults([]);

//     const filteredValue = profiles.filter((profile) =>
//       profile.name.toLowerCase().startsWith(target.value)
//     );
//     setResults(filteredValue);
//   };
//     return <LiveSearch 
//     results={results}      
//     value={selectedProfile?.name}
//     renderItem={(item)=> <p>{item.name}</ p>}
//     onChange={handleChange}
//     onSelect={(item) => setSelectedProfile(item)}
//     />;  
// };

export default profiles;